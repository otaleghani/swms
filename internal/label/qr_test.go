package label

import (
  "testing"
  "fmt"
)

func TestCreateLabel(t *testing.T) {
  err := CreateLabel("https://aficleaning.com", "Ugello rotante rotatorio del cazzo")
  if err != nil {
    t.Errorf(err.Error())
  }
}

func TestPrintLabels(t *testing.T) {
  numItems := 39
  strings := []string{}

  for i := 0; i < numItems; i++ {
    strings = append(strings, "out/test.png")
  }

  string, err := GeneratePdfLabels(strings)
  if err != nil {
    t.Errorf(err.Error())
  }
  fmt.Println(string)
}
