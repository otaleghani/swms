package database

import ()

type Operation struct {
  Id string `json:"id"`
  Date string `json:"date"`
  Quantity int `json:"quantity"`
  User_id string `json:"user"`
  Item_id string `json:"item"`
  Variant_id string `json:"variant"`
}

func (db *Database) SelectOperations(condition string, args ...interface{}) ([]Operation, error) {
  list := []Operation{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

