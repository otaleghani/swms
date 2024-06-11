package database

import (
  "github.com/otaleghani/sorm"
)

type Database struct {
  Sorm *sorm.Database
}

// Initializes the database, creates file if not present
func Init(path string) (Database, error) {
  sorm, err := sorm.CreateDatabase(path, true)
  if err != nil {
    return Database{}, err    
  }

  db := Database{Sorm:sorm}

  // Create different tables
  err = db.Sorm.CreateTable(Item{})
  if err != nil {
    return Database{}, err    
  }
  err = db.Sorm.CreateTable(Variant{})
  if err != nil {
    return Database{}, err    
  }
  err = db.Sorm.CreateTable(Item_image{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(User{})
  if err != nil {
    return Database{}, err
  }
  return db, nil
}

// General query for every table
func (db Database) Insert(row ...interface{}) error {
  err := db.Sorm.InsertInto(row...)
  if err != nil {
    return err
  }
  return nil
}

// General query to update an item
func (db Database) Update(obj interface{}, condition string, args ...interface{}) error {
  err := db.Sorm.Update(obj, condition, args...)
  if err != nil {
    return err
  }
  return nil
}

// General query to delete an item
func (db Database) Delete(obj interface{}, condition string, args ...interface{}) error {
  err := db.Sorm.Delete(obj, condition, args...)
  if err != nil {
    return err
  }
  return nil
}
