package label

import (
  "testing"
)

func TestCreateLabel(t *testing.T) {
  err := CreateLabel("anvedicomeballanandoinquestolunghissimoqrcodes", "")
  if err != nil {
    t.Errorf(err.Error())
  }
}
