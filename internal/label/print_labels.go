/***********************************************************

Author      Oliviero Taleghani
Date        2024-04-24

Description:
  Part of the label package, responsible for creating from a
  list of labels a printable pdf. The function PrintLabels
  takes a slice of strings (labelPaths []string) and uses it
  to print into the pdf the different images. 
  
Usage 
  // fill here  

Dependency
  gopdf     https://github.com/signintech/gopdf

Todo
  - [ ]     Add footer to pages 
  - [ ]     Make all calculations based of the num of
  elements in the page 
          

Changelog
  [0.0.2]   2024-04-24
  Fix       Fixed incorrect printing on subsequential pages       
  
  [0.0.1]   2024-04-24
  Added     Initial release

***********************************************************/

package label

import (
  "fmt"

  "math"
  "github.com/signintech/gopdf"
)

func PrintLabels(labelPaths []string) ([]string, error) {
  var strings []string
  strings = append(strings, "somestring")

  pdf := gopdf.GoPdf{}
  pdf.Start(gopdf.Config{ PageSize: *gopdf.PageSizeA4 }) 
                                        // the page size of
                                        // an A4 is 570 x

  // err := pdf.AddTTFFont("RobotoMono", "fonts/RobotoMono-Regular.ttf")
  // if err != nil {
  //   return strings, nil
  // }
  // err = pdf.SetFont("RobotoMono", "", 14)
  // if err != nil {
  //   return strings, nil
  // }
  // pdf.SetTextColor(123, 197, 250)
  // pdf.SetY(500)
  // pdf.SetX(300)
  // pdf.Cell(&gopdf.Rect{W: 50.0, H: 500.0}, "testing pdf import and then some more")

  // Define the container for the a label.
  // The page is 595, so if we want to add a padding and
  // have a round number we will go with 570 print area,
  // that comes to a 170 pt label.
  rect := &gopdf.Rect{W: 190, H: 54}

  numItems := 79 // len(labelPaths)
  pos := 1 

  itemsPerPage := 39
  counter := itemsPerPage

  for i := 1; i < numItems + 1; i++ {

    // Check if we have space left. If not, add a new page
    // and reset the counter.
    if counter >= itemsPerPage {
      pdf.AddPage()
      counter = 0
    }

    // numPag is based apon the max number of items in a page
    // numCol should be numPag / 3
    // and numRow should be numPag / 13
    // TO DO: Find a way to make this automatic, based on
    // the number of rows and column used by the labels
    // Think about the fact that you will always use a fixed
    // amount of column, but a variable amount of Rows.
    // maxCol := 3
    // maxRow := ??? -> maxRow := math.Ceil(itemsPerPage / 3)
    // (curr)numRow := math.Ceil(i / itemsPerPage / maxRow
    numPag := math.Ceil(float64(i) / float64(itemsPerPage))
    numCol := math.Ceil(float64(i) / (float64(itemsPerPage) / 3))
    numRow := math.Ceil(float64(i) / (float64(itemsPerPage) / 13))

    // Given that the for loop does not take into account
    // the page change, we subtract from the calculated
    // numCol and numRow the number of precedent rows and
    // columns. This number is get by 
    if numPag > 1 {
      numCol = numCol - 3*(numPag-1) 
      numRow = numRow - 13*(numPag-1) 
    }

    fmt.Printf("Item: %v, Page: %v, Col: %v, Row: %v, Pos: %v | ", i, numPag, numCol, numRow, pos)

    x := 6.25 + (190.0+6.25) * float64(pos-1)
    y := 6.25 + (54.0+6.25) * float64(numRow-1)

    fmt.Printf("Print at: %v, %v\n", x, y)

    err := pdf.Image("test-3.png", x, y, rect)

    if err != nil {
      fmt.Println(err.Error())
    }

    if pos == 3 {
      pos = 0
    }
    
    pos++
    counter++
  }

  pdf.WritePdf("test-2.pdf")
  return strings, nil
}
