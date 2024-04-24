package label

import (
  "testing"
)

func TestPrintLabels(t *testing.T) {
  var strings []string

  strings, err := PrintLabels(strings)
  if err != nil {
    t.Errorf(err.Error())
  }
}
