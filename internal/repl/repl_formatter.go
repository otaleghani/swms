package repl

func formatPrompt() string {
  return "\033[30;42m swms \033[0m\033[32m\033[0m "
}

func formatError(text string) string {
  return colorRed("ERROR: " + text) + colorReset("\n")
}
func formatWarning(text string) string {
  return colorYellow("WARNING: " + text) + colorReset("\n")
}
func formatInfo(text string) string {
  return colorBlue("INFO: " + text) + colorReset("\n")
}
func formatLog(text string) string {
  return "LOG: " + text + colorReset("\n")
}
func formatDebug(text string) string {
  return colorBlue("DEBUG: " + text) + colorReset("\n")
}
func formatSuccess(text string) string {
  return colorGreen("SUCCESS: " + text) + colorReset("\n")
}

func colorRed(text string) string {
  return "\033[031m" + text
}
func colorGreen(text string) string {
  return "\033[032m" + text
}
func colorYellow(text string) string {
  return "\033[033m" + text
}
func colorBlue(text string) string {
  return "\033[034m" + text
}
func colorReset(text string) string {
  return "\033[0m" + text
}

