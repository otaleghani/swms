package repl

import (
  "errors"
)

func checkParameters(cmd string, cmdPar map[string]string) error {
  parameters := getCommands()[cmd].parameters

  if len(cmdPar) > len(parameters) {
    return errors.New("Too many params")
  }
  for key := range cmdPar {
    if _, present := parameters[key]; !present {
      return errors.New("unknown parameter: " + key)
    }
  }

  return nil
}
