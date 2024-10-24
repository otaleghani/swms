package database

import ()

type Transaction struct {
  Id string `json:"id"`
  Date string `json:"date"`
  Quantity int `json:"quantity"`
  User_id string `json:"user"`
  Item_id string `json:"item"`
  Variant_id string `json:"variant"`
}

func (db *Database) SelectTransactions(condition string, args ...interface{}) ([]Transaction, error) {
  list := []Transaction{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

