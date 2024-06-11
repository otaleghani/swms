package database

import (
  "errors"
  "golang.org/x/crypto/bcrypt"
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

func (db *Database) InsertUser(user User) error {
  hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 5)
  if err != nil {
    return err
  }
  user.Password = string(hash)

  err = db.Sorm.InsertInto(user)
  if err != nil {
    return err
  }
  return nil
}

// Check if user is valid
func (db *Database) CheckUser(email, password string) error {
  list, err := db.SelectUser("") 
  if err != nil {
    return err
  }
  
  for _, user := range(list) {
    if user.Email == email {
      err = bcrypt.CompareHashAndPassword(
        []byte(user.Password), 
        []byte(password))
      if err != nil {
        return err
      }
      return nil
    }
  }
  return errors.New("no user found")
}
