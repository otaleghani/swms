package label

import (
  "image"
  "image/color"
  "image/draw"
  "image/png"
  "os"

  "github.com/golang/freetype"
  "github.com/golang/freetype/truetype"
  "github.com/skip2/go-qrcode"
  // "golang.org/x/image/font"

  "fmt"
)

func CreateLabel(url string, name string) error {
  qr, err := qrcode.New(url, qrcode.Medium)
  if err != nil {
    return err
  }
  qr.DisableBorder = true
  qrImage := qr.Image(256)

  offset := 20
  textHeight := 30
  imgWidth := qrImage.Bounds().Dx()*3 + 2*offset

  fmt.Println(qrImage.Bounds().Dx())
  fmt.Println(imgWidth)
  
  imgHeight := qrImage.Bounds().Dy() + 2*offset // + textHeight
  newImg := image.NewRGBA(image.Rect(0, 0, imgWidth, imgHeight))
  draw.Draw(newImg, newImg.Bounds(), &image.Uniform{color.White}, image.Point{}, draw.Src)
  qrPos := image.Point{X: offset, Y: offset}
  draw.Draw(newImg, image.Rect(qrPos.X, qrPos.Y, qrPos.X+qrImage.Bounds().Dx(), qrPos.Y+qrImage.Bounds().Dy()), qrImage, image.Point{}, draw.Over)

  addLabel(newImg, `This a unnecessarly long text to proce the 
  
  point that this fucker can be like a swerwerwer`, qrImage.Bounds().Dx() + offset*2, offset*2+textHeight-textHeight) // imgHeight-textHeight)

  outFile, err := os.Create("test-3.png")
  if err != nil {
    return err
  }
  defer outFile.Close()
  png.Encode(outFile, newImg)

  return nil
}

func addLabel(img *image.RGBA, label string, x, y int) {
  c := freetype.NewContext()
  c.SetDPI(72)
  c.SetFont(loadFont())
  c.SetFontSize(12)
  c.SetClip(img.Bounds())
  c.SetDst(img)
  c.SetSrc(image.Black)
  pt := freetype.Pt(x, y)

  // here we should divide into different strings
  // and print on those

  _, err := c.DrawString(label, pt)
  if err != nil {
    panic(err)
  }
}

func loadFont() *truetype.Font {
  fontBytes, err := os.ReadFile("Inter.ttf")
  if err != nil {
    panic(err)
  }

  f, err := truetype.Parse(fontBytes)
  if err != nil {
    panic(err)
  }

  return f
}
