package database

import (
  "testing"
  "fmt"
)

var path = "out/database.db"

func TestDeleteDatabase(t *testing.T) {
  err := deleteDatabase(path)
  if err != nil {
    fmt.Println(err)
  }
}

func TestCreateDatabase(t *testing.T) {
  err := CreateDatabase(path)
  if err != nil {
    fmt.Println(err)
  }
}

