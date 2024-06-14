package database

import (
  "errors"
)

type RefreshToken struct {
  Id string `json:"id"`
  Token string `json:"token"`
  Revoked bool `json:"revoked"`
}

func (db *Database) CheckRevokedToken(token string) error {
  list := []RefreshToken{}
  err := db.Sorm.Select(&list, "Token = ?", token)
  if err != nil {
    return err
  }
  if len(list) != 1 {
    return errors.New("No token found")
  }
  if list[0].Revoked == true {
    return errors.New("Token was revoked")
  }
  return nil
}

func (db *Database) RevokeToken(token string) error {
  list := []RefreshToken{}
  err := db.Sorm.Select(&list, "Token = ?", token)
  if err != nil {
    return err
  }
  if len(list) != 1 {
    return errors.New("No token found")
  }
  list[0].Revoked = true

  err = db.Update(list[0], "Token = ?", token)
  if err != nil {
    return err
  }

  return nil
}
