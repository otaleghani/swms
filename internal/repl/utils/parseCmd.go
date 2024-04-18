package utils

import (
  "strings"
  "errors"
  "fmt"
)

func ParseCmd(rawCmd string) (string, map[string]string, error) {
  words := strings.Fields(rawCmd)
  cmdName := words[0]
  cmdPar := make(map[string]string)



  for i := 1; i < len(words); i += 2 {
    // 1 3 5 7 9...
    if strings.Contains(words[i], "-") == false {
      fmt.Println("it does not contain -")
      return "", nil, errors.New("Unknown parameters")
    } 
    fmt.Println(len(words))
    if (i + 1) >= len(words) {
      fmt.Println("lenght overflow")
      return "", nil, errors.New("Parameter numbers not good")
    }
    cmdPar[words[i]] = words[i + 1]
  }

  return cmdName, cmdPar, nil
}
