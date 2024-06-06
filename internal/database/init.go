package database

import (
  "github.com/otaleghani/sorm"
)

var dbPath = "out/database.db"

// Initializes the database, creates file if not present
func Init() error {
  path := "out/database.db"
  err := sorm.CreateDatabase(path)
  if err != nil {
    return err    
  }

  err = sorm.CreateTable(Item{})
  if err != nil {
    return err    
  }
  err = sorm.CreateTable(Variant{})
  if err != nil {
    return err    
  }
  err = sorm.CreateTable(Item_Images{})
  if err != nil {
    return err    
  }
  return nil
}
