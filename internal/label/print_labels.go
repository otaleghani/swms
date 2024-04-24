package label

import (
  // "image"
  // "image/color"
  // "image/draw"
  // "image/png"
  // "os"

  "github.com/signintech/gopdf"
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
  // W: 595, H: 1190 | In PT, so you need to do / 3 * 4


  err := pdf.AddTTFFont("RobotoMono", "fonts/RobotoMono-Regular.ttf")
  if err != nil {
    return strings, nil
  }
  err = pdf.SetFont("RobotoMono", "", 14)
  if err != nil {
    return strings, nil
  }
  
  pdf.AddPage()
  pdf.SetTextColor(123, 197, 250)
  pdf.SetY(500)
  pdf.SetX(300)
  pdf.Cell(&gopdf.Rect{W: 50.0, H: 500.0}, "testing pdf import and then some more")

  // tpl1 := pdf.ImportPage("test.pdf", 2, "/MediaBox")
  // pdf.UseImportedTemplate(tpl1, 0, 0, 1000, 0)

  rect := &gopdf.Rect{W: 190, H: 54}

  // Max width 570 
  // Every label comes at 570/3 = 190

  pdf.Image("test-3.png", 6.25, 6.25, rect)
  pdf.Image("test-3.png", 202.5, 6.25, rect)
  pdf.Image("test-3.png", 398.75, 6.25, rect)



  pdf.WritePdf("test-2.pdf")
  return strings, nil
}


