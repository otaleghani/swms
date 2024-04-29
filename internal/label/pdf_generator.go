/********************************************************************

Author      Oliviero Taleghani
Date        2024-04-24

Description
  Part of the label package, responsible for creating from a list of
  paths of labels a printable pdf. The function GeneratePdfLabels
  takes a slice of strings (labelPaths []string) and uses it to print
  into the pdf the different images. 
  
Usage 
  labelPaths := []string{"img/1.png", "img/2.png"}
  path, err := GeneratePdfLabels(labelPaths)

Dependency
  gopdf     https://github.com/signintech/gopdf

Todo
  - [x]     Cleanup
  - [x]     Comments
  - [x]     Call by using list of paths
  - [ ]     Add footer to pages 
  - [x]     Make all calculations based of the num of
  elements in the page 
          

Changelog
  [0.1.0]   2024-04-29
  Feat      Now works with a []string input
  Chore     Cleanup
  Chore     Comments

  [0.0.3]   2024-04-24
  Feat      Fixed calculations 

  [0.0.2]   2024-04-24
  Fix       Fixed incorrect printing on subsequential pages       
  
  [0.0.1]   2024-04-24
  Added     Initial release

*********************************************************************/

package label

import (
  "fmt"

  "math"
  "github.com/signintech/gopdf"
)

func GeneratePdfLabels(labelPaths []string) (string, error) {
  pdfPath := "out/test.pdf"
  // The pdf path.

  pdf := gopdf.GoPdf{}
  pdf.Start(gopdf.Config{ PageSize: *gopdf.PageSizeA4 }) 

  rect := &gopdf.Rect{W: 190, H: 54}
  // Define the container for the label. The page is 595, so if we
  // want to add a padding and have a round number we will go with 570
  // print area, that comes to a 170 pt label.

  numItems      := len(labelPaths)  // Number of paths
  itemsPerPage  := 39               // Max items per page
  currentPos    := itemsPerPage     // Current position

  for i := 1; i < numItems + 1; i++ {
    if currentPos >= itemsPerPage {
      pdf.AddPage()
      currentPos = 0
    }
    // Check if we have space left in the page. If not, add a new page
    // and reset the counter. This is why we start with currentPos =
    // itemsPerPage
    
    numPag := math.Ceil(float64(i) / float64(itemsPerPage))
    numRow := math.Ceil(float64(i) / (float64(itemsPerPage) / 13))
    numCol := i-(int(numRow)-1)*3
    // Here is calculated the actual position of the label, so his
    // page, his column and his row.
    // numPage  -> i / itemsPerPage 
    // numRow   -> i / 13 -> Because we can have max 13 rows in one
    // page, so by calculating this we establish the row.
    // numCol   -> i - numRow-1*3 -> Because we want to subtract every
    // single row so that we only get 1, 2 or 3 as a result

    if numPag > 1 {
      numRow = numRow - 13*(numPag-1) 
    }
    // Given that the for loop does not take into account the page
    // change, we subtract from the calculated numRow the number of
    // precedent rows. By doing this we are basically eliminating the
    // need to create a counter.

    x := 6.25 + (190.0+6.25) * float64(numCol-1)
    y := 6.25 + (54.0+6.25) * float64(numRow-1)
    // Calculating the x and y position of the current label by
    // taking into consideration the padding of the page (6.25), the
    // lenght of the rectangle (190x54) and the current row-column.

    // Debuggers
    // fmt.Printf("Item: %v, Page: %v, Col: %v, Row: %v, Pos: %v | ", i, numPag, numCol, numRow, currentPos)
    // fmt.Printf("Print at: %v, %v\n", x, y)

    err := pdf.Image(labelPaths[i-1], x, y, rect)
    // Finally we print the page. We use i-1 because we started from 1

    if err != nil {
      fmt.Println(err.Error())
    }

    currentPos++
  }

  pdf.WritePdf(pdfPath)
  // and we write the pdf.

  return pdfPath, nil
}
