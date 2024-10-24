package database

import ()

type Client struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Surname string `json:"surname"`
  IsBusiness bool `json:"isBusiness"`
}

func (db *Database) SelectClients(condition string, args ...interface{}) ([]Client, error) {
  list := []Client{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}
