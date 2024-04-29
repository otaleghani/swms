package label

import (
  "image"
  "github.com/golang/freetype"
  "github.com/golang/freetype/truetype"
  "golang.org/x/image/font"
  "os"
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

func measureStringWidth(s string, face font.Face) (width int) {
  for _, x := range s {
    awidth, ok := face.GlyphAdvance(rune(x))
    if ok != true {
      continue
    }
    width += int(awidth >> 6)
  }
  return
}

func wrapText(s string, maxWidth int, face font.Face) []string {
  currentWidth := 0
  currentString := ""
  var strings []string

  for index, x := range s {
    charLenght := measureStringWidth(string(x), face) 

    if currentWidth + charLenght > maxWidth {
      strings = append(strings, currentString)
      currentWidth = 0
      currentString = ""
    }

    if len(currentString) == 0 && string(x) == " " {
      continue
    }
    currentWidth += charLenght
    currentString += string(x)

    if index == len(s) - 1 {
      strings = append(strings, currentString)
    }
  }

  if len(strings) > 1 && len(strings[len(strings)-1]) == 1 {
    strings[len(strings)-2] += strings[len(strings)-1]
    strings = strings[:len(strings)-1]
  }

  return strings
}

func loadFont() *truetype.Font {
  fontBytes, err := os.ReadFile("fonts/RobotoMono-Regular.ttf")
  if err != nil {
    panic(err)
  }

  f, err := truetype.Parse(fontBytes)
  if err != nil {
    panic(err)
  }

  return f
}
