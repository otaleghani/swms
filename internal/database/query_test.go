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
  //err := PostItem(path, Item{
  //  Id:"1",
  //  Name:"Alberto",
  //  Description:"Something", 
  //  Archived: false,
  //  Position_id: "69",
  //  Category_id: "spicy content",
  //  SubCategory_id: "some other spicyness",
  //})
  //if err != nil {
  //  t.Fatal(err)
  //}

  //err = PostItem(path, Item{
  //  Id:"2",
  //  Name:"Angela",
  //  Description:"Something", 
  //  Archived: false,
  //  Position_id: "69",
  //  Category_id: "spicy content",
  //  SubCategory_id: "some other spicyness",
  //})
  //if err != nil {
  //  t.Fatal(err)
  //}
  item := Item{
    Id:"1",
    Name:"Alberto",
    Description:"Something", 
    Archived: false,
    Position_id: "69",
    Category_id: "spicy content",
    SubCategory_id: "some other spicyness",
  }

  err := add(item, path)
  if err != nil {
    t.Fatal(err)
  }
}

func TestGetItems(t *testing.T) {
  _, err := GetItems(path)
  if err != nil {
    t.Fatal(err)
  }
}

func TestGetSingleItem(t *testing.T) {
  _, err := GetItemById(path, "1")
  if err != nil {
    t.Fatal(err)
  }
}

func TestUpdateItem(t *testing.T) {
  item := Item{
    Id: "1",
    Name:"69",
    Description:"sandro",
    Archived: true,
    Position_id:"position",
    //Category_id:"category",
    SubCategory_id:"subcat",
  }
  err := PutItem(path, item)
  if err != nil {
    t.Fatal(err)
  }
}

func TestGetSingleItem2(t *testing.T) {
  _, err := GetItemById(path, "1")
  if err != nil {
    t.Fatal(err)
  }
}

func TestAddFunction(t *testing.T) {
  item := Item{
    Id: "2",
    Name:"69",
    Description:"sandro",
    Archived: true,
    Position_id:"position",
    Category_id:"category",
    SubCategory_id:"subcat",
  }

  err := add(item, path)
  if err != nil {
    t.Fatal(err)
  }
}
