package label

import (
  "image"
  "image/color"
  "image/draw"
  "image/png"
  "os"

  "github.com/skip2/go-qrcode"
)

func CreateLabel(url string, name string) error {
  qr, err := qrcode.New(url, qrcode.Medium)
  if err != nil {
    return err
  }
  qr.DisableBorder = true
  qrImage := qr.Image(500)

  offset := qrImage.Bounds().Dx()/20
  imgWidth := qrImage.Bounds().Dx()/2*7+offset*2
  imgHeight := qrImage.Bounds().Dy()+offset*2

  newImg := image.NewRGBA(image.Rect(0, 0, imgWidth, imgHeight))
  draw.Draw(newImg, newImg.Bounds(), &image.Uniform{color.RGBA{R: 230, G: 230, B: 230, A: 255}}, image.Point{}, draw.Src)

  qrPos := image.Point{X: offset, Y: offset}
  draw.Draw(newImg, image.Rect(qrPos.X, qrPos.Y, qrImage.Bounds().Dx()+offset, qrImage.Bounds().Dy()+offset), qrImage, image.Point{}, draw.Over)

  drawLabel(newImg, name, qrImage.Bounds().Dx()+offset*2, offset) 

  outFile, err := os.Create("test-3.png")
  if err != nil {
    return err
  }
  defer outFile.Close()
  png.Encode(outFile, newImg)

  return nil
}

