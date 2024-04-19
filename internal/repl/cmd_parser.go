package repl

import (
  "strings"
  "errors"
)

func parseCmd(rawCmd string) (string, map[string]string, error) {
  words := strings.Fields(rawCmd)
  cmdName := strings.ToLower(words[0])
  cmdPar := make(map[string]string)

  for i := 1; i < len(words); i += 2 {
    if strings.Contains(words[i], "-") == false {
      return "", nil, errors.New("Unknown parameters")
    } 
    if (i + 1) >= len(words) {
      return "", nil, errors.New("Parameter numbers not good")
    }
    cmdPar[words[i]] = words[i + 1]
  }

  return cmdName, cmdPar, nil
}
