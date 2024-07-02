package repl

import (
  "github.com/otaleghani/swms/internal/server"
)

func cmdStart(cfg *Configuration, cmdPar map[string]string) error {
  server.Serve(cfg.DatabasePath, "8080")
  // go server.ServerStart(cfg.DatabasePath)

  return nil
}
