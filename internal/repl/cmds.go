package repl

import()

type cmd struct {
  name string
  short string
  long string
  callback func(cfg *Config, cmdPar map[string]string) error
  parameters map[string]string
}

func getCommands() map[string]cmd {
  return map[string]cmd{
    "help": {
      name: "help",
      short: "Display help message",
      long: `Here the long description...`,
      callback: cmdHelp,
      parameters: map[string]string{
        "-c": "Specifies the command that you want to understand more",
      },
    },
    "clear": {
      name: "clear",
      short: "Clears terminal",
      long: `Here the long description...  `,
      callback: cmdClear,
      parameters: map[string]string{
        "-c": "Specifies the command that you want to understand more",
      },
    },
    "start": {
      name: "start",
      short: "Starts the program",
      long: `Use this command to start the program. This starts the
      http server, the database and starts to log every single cmd 
      in a specified log file. `,
      callback: cmdStart,
      parameters: map[string]string{
        "-c": "Specifies the command that you want to understand more",
      },
    },
    "exit": {
      name: "exit",
      short: "Exits the program",
      long: `long description`,
      callback: cmdClear,
      parameters: map[string]string{
        "-c": "Specifies the command that you want to understand more",
      },
    },
  }
}

