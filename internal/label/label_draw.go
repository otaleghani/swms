package label

import (
  "image"
  "github.com/golang/freetype"
  "github.com/golang/freetype/truetype"
  "golang.org/x/image/font"
  "fmt"
)

func drawLabel(img *image.RGBA, label string, x, y int) {
  fontSize := 20.0
  fontDPI := 72.0

  c := freetype.NewContext()
  c.SetDPI(fontDPI)
  c.SetFont(loadFont())
  c.SetFontSize(fontSize)
  c.SetClip(img.Bounds())
  c.SetDst(img)
  c.SetSrc(image.Black)

  fontFace := truetype.NewFace(loadFont(), &truetype.Options{
    Size: fontSize,
    DPI: fontDPI,
    Hinting: font.HintingFull,
  })

  wrappedText := wrapText(label, 230, fontFace)
  for index, string := range wrappedText {
    fmt.Println(string)
    pt := freetype.Pt(x, y + (index * int(fontSize)))
    _, err := c.DrawString(string, pt)
    if err != nil {
      panic(err)
    }
  }
}

