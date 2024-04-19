package repl

import (
  "os"
  "os/exec"
  "runtime"
)

func cmdClear(cfg *Config, cmdPar map[string]string) error {
  var cmd *exec.Cmd
  switch runtime.GOOS {
  case "windows":
    cmd = exec.Command("cmd", "/c", "cls")
  default:
    cmd = exec.Command("clear")
  }

  cmd.Stdout = os.Stdout
  cmd.Run()

  return nil
}
