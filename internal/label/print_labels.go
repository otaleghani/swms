package label

import (
  // "image"
  // "image/color"
  // "image/draw"
  // "image/png"
  // "os"

  "math"
  "github.com/signintech/gopdf"
  "fmt"
)

  // decode every single image
  // divide the images into pages, like 20 for page
  // For every item in pages, create a page
  // You maybe have to clear the "pages directory"

func PrintLabels(labelPaths []string) ([]string, error) {
  var strings []string
  strings = append(strings, "somestring")

  pdf := gopdf.GoPdf{}
  pdf.Start(gopdf.Config{ PageSize: *gopdf.PageSizeA4 }) 

  err := pdf.AddTTFFont("RobotoMono", "fonts/RobotoMono-Regular.ttf")
  if err != nil {
    return strings, nil
  }
  err = pdf.SetFont("RobotoMono", "", 14)
  if err != nil {
    return strings, nil
  }
  
  // pdf.SetTextColor(123, 197, 250)
  // pdf.SetY(500)
  // pdf.SetX(300)
  // pdf.Cell(&gopdf.Rect{W: 50.0, H: 500.0}, "testing pdf import and then some more")

  // Max width 570 
  // Every label comes at 570/3 = 190
  rect := &gopdf.Rect{W: 190, H: 54}

  numItems := 90
  pos := 1 
  counter := 0
  pdf.AddPage()
  for i := 1; i < numItems + 1; i++ {
    if counter > 30 {
      pdf.AddPage()
      counter = 0
    }

    numPag := math.Ceil(float64(i) / 30)
    numCol := math.Ceil(float64(i) / 15)
    numRow := math.Ceil(float64(i) / 3)

    if numPag > 1 {
      numCol = numCol - 2*(numPag-1)
      numRow = numRow - 10*(numPag-1)
    }

    fmt.Printf("Item: %v, Page: %v, Col: %v, Row: %v, Pos: %v\n", i, numPag, numCol, numRow, pos)

    x := 6.25 + (190.0+6.25) * float64(pos-1)
    y := 6.25 + (54.0+6.25) * float64(numRow-1)

    pdf.Image("test-3.png", x, y, rect)

    if pos == 3 {
      pos = 0
    }
    
    pos++
    counter++
  }

  // for i := 0; i < numPages; i++ {
  //   total := 0
  //   pdf.AddPage()
  //   for j := 0; j < 3; j++ {
  //     for k := 0; k < 5; k++ {
  //       if total >= numItems {
  //         break
  //       }
  //       total++
  //       x := 6.25 + (190.0 + 6.25) * float64(j)
  //       y := 6.25 + (54.0 + 6.25) * float64(k)
  //       pdf.Image("test-3.png", x, y, rect)
  //     }
  //   } 
  // }
  // pdf.Image("test-3.png", 6.25, 6.25, rect)
  // pdf.Image("test-3.png", 202.5, 6.25, rect)
  // pdf.Image("test-3.png", 398.75, 6.25, rect)



  pdf.WritePdf("test-2.pdf")
  return strings, nil
}


