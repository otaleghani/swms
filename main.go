package main

import (
   "github.com/otaleghani/swms/internal/repl"
)

func main() {
  cfg := repl.Config{
    DbPath: "something",
  }

  repl.StartRepl(&cfg)
}
