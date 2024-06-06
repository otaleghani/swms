package database

import (
  "testing"
  // "fmt"
)

func TestInit(t *testing.T) {
  err := Init()
  if err != nil{
    t.Fatal(err)
  }

  i := ItemSlice{
    Item{
      Id: "asd",
      Name: "asd",
      Description: "asd",
      Archive: true,
      Position_id: "asd",
      Category_id: "asd",
      SubCategory_id: "asd",
    },
  }

  err = i.Insert()
  if err != nil{
    t.Fatal(err)
  }

  // k := ItemSlice{}
  // err = k.Select("Id = ?", "asd")
  // if err != nil{
  //   t.Fatal(err)
  // }
  // 
  //   fmt.Println(k)
}
