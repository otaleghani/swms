package main

import (
   "github.com/otaleghani/swms/internal/repl"
)

func main() {
  cfg := repl.Configuration{
    DatabasePath: "something",
  }

  repl.StartRepl(&cfg)
}
