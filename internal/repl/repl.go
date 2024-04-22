package repl

import (
  "bufio"
  "os"
  "fmt"
)

type Configuration struct {
  DatabasePath string
}

func StartRepl(cfg *Configuration) {
  reader := bufio.NewScanner(os.Stdin)

  for {
    fmt.Print(formatPrompt())
    reader.Scan()
    if reader.Text() == "" {
      continue
    }
    cmdName, cmdPar, err := parseCmd(reader.Text())

    if err != nil {
      fmt.Print(formatError(err.Error()))
      continue
    }
    
    command, exists := getCommands()[cmdName]
    if !exists {
      fmt.Print(formatError("Unknown command. Try \"help\" to view all the commands."))
      continue
    }

    err = command.callback(cfg, cmdPar)
    if err != nil {
      fmt.Print(formatError(err.Error()))
      continue
    }
  }
}

