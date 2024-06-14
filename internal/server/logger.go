package server

import (
	"fmt"
	"io"
	"log"
	"os"
)

func logMsg(msg string) {
	file, err := os.OpenFile("program.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("Failed to open log file: %v", err)
	}
	defer file.Close()

	multiWriter := io.MultiWriter(file, os.Stdout)

	log.SetOutput(multiWriter)
	log.SetFlags(log.Ldate | log.Ltime)
	log.Println(msg)
}

func logRequest(method, path, address string, code int) {
	logMsg(fmt.Sprintf("%v, %v, %v, %v", method, path, address, code))
}
