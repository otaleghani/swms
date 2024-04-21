package repl

import (
  "github.com/otaleghani/swms/internal/server"
)

func cmdStart(cfg *Config, cmdPar map[string]string) error {
  go server.Handler()

  return nil
}
