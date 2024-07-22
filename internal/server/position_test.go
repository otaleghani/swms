package server

import ( 
  "testing"
  "github.com/otaleghani/spg"
  "fmt"
)

func TestSpg(t *testing.T) {
  g := spg.New("en-usa")
  var opt = spg.Options{Format: "camel", Separator: "-"}
  fmt.Println(g.Person().FullName(opt))
}
