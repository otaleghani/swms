package label

import (
  "testing"
)

func TestCreateLabel(t *testing.T) {
  err := CreateLabel("anvedicomeballanandoinquestolunghissimoqrcodes", "Anvedi come balla nando incredibile questo sandro ")
  if err != nil {
    t.Errorf(err.Error())
  }
}

func TestPrintLabels(t *testing.T) {
  var strings []string

  strings, err := PrintLabels(strings)
  if err != nil {
    t.Errorf(err.Error())
  }
}
