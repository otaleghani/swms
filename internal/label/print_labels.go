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

  pdf.AddPage()
  err := pdf.AddTTFFont("RobotoMono", "fonts/RobotoMono-Regular.ttf")
  if err != nil {
    return strings, nil
  }

  err = pdf.SetFont("RobotoMono", "", 14)
  if err != nil {
    return strings, nil
  }
  pdf.Cell(nil, "asd")
  pdf.WritePdf("test.pdf")
  return strings, nil
}
