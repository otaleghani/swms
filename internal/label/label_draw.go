package label

import (
  "image"
  "github.com/golang/freetype"
  "github.com/golang/freetype/truetype"
  "golang.org/x/image/font"
)

func drawLabel(img *image.RGBA, label string, x, y int) {
  fontSize := 20.0
  fontDPI := 200.0

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

  textBoxWidth := (img.Bounds().Dx()/14)*9

  wrappedText := wrapText(label, textBoxWidth, fontFace)
  for index, string := range wrappedText {
    pt := freetype.Pt(x, y+((index+1) * int(fontDPI / fontSize * 5)))
    _, err := c.DrawString(string, pt)
    if err != nil {
      panic(err)
    }
  }
}

