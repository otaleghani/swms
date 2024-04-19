package repl

import (
  "fmt"
  "errors"
)

func cmdHelp(cfg *Config, cmdPar map[string]string) error {
  if len(cmdPar) == 0 {
    printDefault()
    return nil
  }

  err := checkParameters("help", cmdPar)
  if err != nil {
    return err
  }

  err = printCmd(cmdPar["-c"])
  if err != nil {
    return err
  }

  return nil
}

func printDefault() {
  availableCmds := ""
  availableFlags := ""
  parameters := getCommands()["help"].parameters

  for _, value := range getCommands() {
    availableCmds += formatList(value.name, value.short)
  }

  for key, value := range parameters {
    availableFlags += formatList(key, value)
  }

  fmt.Printf(`
Simple Warehouse Management System
The simplest way to manage your warehouse.

Usage
     swms > [command]

Available Commands
%s
Flags
%s
`, availableCmds, availableFlags)
}

func printCmd(s string) error {
  cmd, exists := getCommands()[s]
  if !exists {
    return errors.New("Unknown command")
  }

  availableFlags := ""

  for key, value := range cmd.parameters {
    availableFlags += formatList(key, value)
  }

  fmt.Printf(`
%s

%s

Usage
     swms > %s [flags]

Flags
%s
`, cmd.name, cmd.long, cmd.name, availableFlags)
  return nil
}

func formatList(head string, body string) string {
  s := alignPrint("     " + head)
  return s + body + "\n"
}

func alignPrint(s string) string {
  for len(s) < 20 {
    s += " " 
  }
  return s
}
