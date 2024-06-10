package database

import (
)

type User struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Surname string `json:"surname"`
  Email string `json:"email"`
  Password string `json:"password"`
}

func (db *Database) SelectUser(condition string, args ...interface{}) ([]User, error) {
  list := []User{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, err
}

// Select a single item based on the id
func (db *Database) SelectUserById(id string) (User, error) {
  list := []User{}
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return User{}, err
  }
  return list[0], nil
}
