/********************************************************************

Author      Oliviero Taleghani
Date        2024-04-24

Description
  Part of the label package, responsible for creating from an input
  url and description a label image that can be used for identifing a
  product in the warehouse. The idea is that whenever you add a new
  product into the software a new label get's generated using the URI
  of the product and the name of the product.
  The labels use qr codes to exchange info. This is because we want to
  make it as approchable as possible.
  Basically it should create in a certain folder a label image that
  can be retrieved afterwards. The idea is that you would put products
  into the software, print the labels by calling the pdf_generator,
  put then  the labels on the warehouse and have an easy connection
  between the software and the warehouse. 
  The URI should be something like /files/uri.png, where uri is the
  unique identifier.
  
Usage
  err := CreateLabel("product1", "A simple product")

Dependency
  https://github.com/skip2/go-qrcode

Todo
  - [ ]     Do I have to put into the label a SKU code?

Changelog
  [0.0.1]   2024-04-24
  Added     Initial release

*********************************************************************/
package label

import (
  "image"
  "image/color"
  "image/draw"
  "image/png"
  "os"

  "github.com/skip2/go-qrcode"
)

func CreateLabel(url string, labelString string) error {
  qr, err := qrcode.New(url, qrcode.Medium)
  if err != nil {
    return err
  }
  qr.DisableBorder = false
  qr.ForegroundColor = color.RGBA{R:0, G:0, B:0, A:255}
  qr.BackgroundColor = color.RGBA{R:255, G:255, B:255, A:255}
  qrImage := qr.Image(400)
  // Everything is based on the initial qr code image. So you could in
  // theory change the image width to change automatically everything.

  offset := qrImage.Bounds().Dx()/20
  imgWidth := qrImage.Bounds().Dx()/2*7+offset*2
  imgHeight := qrImage.Bounds().Dy()+offset*2
  // Sets the new image dimensions

  newImg := image.NewRGBA(image.Rect(0, 0, imgWidth, imgHeight))
  draw.Draw(newImg, newImg.Bounds(), &image.Uniform{color.RGBA{R: 235, G: 235, B: 235, A: 255}}, image.Point{}, draw.Src)
  // Creates the new image and puts a fill background

  qrPos := image.Point{X: offset, Y: offset}
  draw.Draw(newImg, image.Rect(qrPos.X, qrPos.Y, qrImage.Bounds().Dx()+offset, qrImage.Bounds().Dy()+offset), qrImage, image.Point{}, draw.Over)
  // Draws inside of the image the original qr code

  drawLabel(newImg, labelString, qrImage.Bounds().Dx()+offset*2, offset) 
  // Calls drawLabel to draw the label. This operation is done in
  // place, so the new image with the label will be on newImg.

  outFile, err := os.Create("out/test.png")
  if err != nil {
    return err
  }
  defer outFile.Close()
  png.Encode(outFile, newImg)
  // Saves file in out/test.png

  return nil
}
