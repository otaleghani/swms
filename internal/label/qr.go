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
  // 56 in pt, so it's 
  qrImage := qr.Image(100)

  offset := 0
  imgWidth := (qrImage.Bounds().Dx()/2)*7 + offset
  imgHeight := qrImage.Bounds().Dy() + offset

  newImg := image.NewRGBA(image.Rect(0, 0, imgWidth, imgHeight))
  draw.Draw(newImg, newImg.Bounds(), &image.Uniform{color.RGBA{R: 240, G: 240, B: 240, A: 255}}, image.Point{}, draw.Src)
  qrPos := image.Point{X: offset/2, Y: offset/2}
  draw.Draw(newImg, image.Rect(qrPos.X, qrPos.Y, qrPos.X+qrImage.Bounds().Dx(), qrPos.Y+qrImage.Bounds().Dy()), qrImage, image.Point{}, draw.Over)

  drawLabel(newImg, name, qrImage.Bounds().Dx() + offset, newImg.Bounds().Dy() - qrImage.Bounds().Dy() + offset) 

  outFile, err := os.Create("test-3.png")
  if err != nil {
    return err
  }
  defer outFile.Close()
  png.Encode(outFile, newImg)

  return nil
}

