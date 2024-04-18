package repl

import (
  "bufio"
  "os"
  "fmt"
  "github.com/otaleghani/swms/internal/repl/utils"
  "github.com/otaleghani/swms/internal/repl/formatter"
)

//func StartRepl(cfg *config) {
func StartRepl() {
  reader := bufio.NewScanner(os.Stdin)

  for {
    fmt.Print(formatter.FormatError(""))
    reader.Scan()
    //input := cleanInput(reader.Text())
    if reader.Text() == "" {
      continue
    }

    

    // fmt.Print(reader.Text())
    cmdName, cmdPar, err := utils.ParseCmd(reader.Text())


    // command parsing

    if err != nil {
      fmt.Println(err)
      continue
    }
    
    fmt.Println(cmdName)
    fmt.Println(cmdPar)
    // fmt.Sprintf("Command found. The command name is %s\n", cmdName)
    // fmt.Println("Now I will do a magic trick and print all of the params")
    // for key, value := range cmdPar {
    //   fmt.Sprintf("%s: %s\n", key, value)
    // }


    // HOW TO DO THIS
    // You pass to the function a map of map[parameter]value

    // cmd_name = input[0]
    // cmd, exists := getCommand()[cmd_name]
    // if exists {
    //   err := command.callback(cfg)
    // }
  }
}

