package repl

import (
  "bufio"
  "os"
  "fmt"
)

// is this the configuration used for 
// the database connection? maybe yes
// I mean this repl will be the entry
// point of the application so I thi-
// -nk is a goos thing.

type Config struct {
  DbPath string
}

func StartRepl(cfg *Config) {
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

