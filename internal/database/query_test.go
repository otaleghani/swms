package database

import (
  "testing"
)

var path = "out/database.db"

func TestDeleteDatabase(t *testing.T) {
  err := deleteDatabase(path)
  if err != nil {
    t.Fatal(err)
  }
}

func TestCreateDatabase(t *testing.T) {
  err := CreateDatabase(path)
  if err != nil {
    t.Fatal(err)
  }
}

func TestAddItem(t *testing.T) {
  err := AddItem(path, Item{Id:"1",Name:"Alberto"})
  if err != nil {
    t.Fatal(err)
  }

  err = AddItem(path, Item{Id:"2",Name:"Angela"})
  if err != nil {
    t.Fatal(err)
  }
}

func TestGetItems(t *testing.T) {
  err := GetItemsList(path)
  if err != nil {
    t.Fatal(err)
  }
}

func TestGetSingleItem(t *testing.T) {
  err := GetItemSingle(path, "1")
  if err != nil {
    t.Fatal(err)
  }
}
