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

func TestAddItem(t *testing.T) {
  err := AddItem(path, Item{Id:1,Name:"Alberto"})
  if err != nil {
    fmt.Println(err)
  }
}

// func TestGetItems(t *testing.T) {
//   
// }
