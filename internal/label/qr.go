package label

import (
  // "image"
  // "image/color"
  // "image/draw"
  // "image/png"
  "os"

  // "github.com/golang/freetype"
  // "github.com/golang/freetype/truetype"
  "github.com/skip2/go-qrcode"
  // "golang.org/x/image/font"
)

func CreateLabel(url string, name string) error {
  // var png []byte
  qrImage, err := qrcode.Encode(url, qrcode.Medium, 256)
  // qr, err := qrcode.New(url, qrcode.Medium)
  // if err != nil {
  //   return err
  // }
  // qrImage := qr.Image(256)
  // offset := 20
  // newImg := image.NewRGBA(image.rect(0, 0, imgWidth, imgHeight))
  // draw.Draw(newImg, newImg.Bounds())


  // outFile, err := os.Create("test.png")
  // if err != nil {
  //   return err
  // }
  // defer outFile.Close()
  err = os.WriteFile("test.png", qrImage, 0666)
  if err != nil {
    return err
  }

  return nil
}
