package database

import (
  "testing"
  "github.com/otaleghani/sorm"
  "fmt"
)

func TestInit(t *testing.T) {
  testPath := "out/test.db"

  sorm.DeleteDatabase(testPath)
  db, err := Init(testPath)
  if err != nil{
    t.Fatal(err)
  }

  var i []interface{}
  i = append(i, Item{
    Id: "asd",
    Name: "asd",
    Description: "asd",
    Archive: true,
    Position_id: "asd",
    Category_id: "asd",
    Subcategory_id: "asd",
  })
  i = append(i, Item{
    Id: "asd2",
    Name: "asd",
    Description: "asd",
    Archive: true,
    Position_id: "asd",
    Category_id: "asd",
    Subcategory_id: "asd",
  })

  err = db.Insert(i...)
  if err != nil{
    t.Fatal(err)
  }

  list, err := db.SelectItem("")
  if err != nil {
    t.Fatal(err)
  }
  fmt.Println(list)

  item, err := db.SelectItemById("asd")
  if err != nil {
    t.Fatal(err)
  }
  fmt.Println(item)

  err = db.Update(Item{Name: "anvediOH"}, "Id = ?", "asd")
  if err != nil {
    t.Fatal(err)
  }
}
