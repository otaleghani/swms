package label

import (
  "testing"
)

func TestCreateLabel(t *testing.T) {
  err := CreateLabel("google.com", "")
  if err != nil {
    t.Errorf(err.Error())
  }
}
