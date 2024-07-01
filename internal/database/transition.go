package database

import ()

type Transition struct {
  Id string `json:"id"`
  Date string `json:"data"`
  Quantity int `json:"quantity"`
  User_id string `json:"user"`
  Item_id string `json:"item"`
  Variant_id string `json:"variant`
}

func (db *Database) SelectTransitions(condition string, args ...interface{}) ([]Transition, error) {
  list := []Transition{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

