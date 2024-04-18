package formatter

import (
  // "fmt"
)

func AddPrefix(text string) string {
  return "swms > " + text
}
func FormatError(text string) string {
  return AddPrefix(ColorRed("Error: ") + text)
}

// Warnings 

// Informational

// Successful

// Log

// Debug

func ColorRed(text string) string {
  return "\033[031m" + text
}
func ColorGreen(text string) string {
  return "\033[032m" + text
}
func ColorYellow(text string) string {
  return "\033[033m" + text
}
func ColorBlue(text string) string {
  return "\033[034m" + text
}
func ColorReset(text string) string {
  return "\033[0m" + text
}

