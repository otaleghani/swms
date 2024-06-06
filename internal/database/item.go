package database

import (
  "github.com/otaleghani/sorm"
)

type Item struct {
  Id string
  Name string
  Description string
  Archive bool
  Position_id string
  Category_id string
  SubCategory_id string
}

type ItemSlice []Item

// I could do something general? 
func Insert(i Interface{}) {
  err = sorm.InsertInto(i)
  if err != nil {
      fatal(err)
  }
}

func (items ItemSlice) Insert() error {
  for item, _ := range items {
    err := sorm.InsertInto(item)
    if err != nil {
      return err
    }
  }
  return nil
}

// func (i *ItemSlice) Select(condition string, args ...interface{}) error {
//   items := []Item{}
//   err := sorm.Select(items, condition, args...)
//   if err != nil {
//     return err
//   }
//   return nil
// }

// POST, GET, PUT, DELETE
// INSERT, SELECT, UPDATE, DELETE
