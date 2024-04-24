package label

import (
  "golang.org/x/image/font"
  "github.com/golang/freetype/truetype"
  "os"
)

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
