package database

import (
  "github.com/otaleghani/sorm"
)

type Database struct {
  Sorm *sorm.Database
}

type Metadata struct {
  Secret string
}

func Open(path string) (Database, error) {
  sorm, err := sorm.CreateDatabase(path, true)
  if err != nil {
    return Database{}, err    
  }
  db := Database{Sorm:sorm}
  return db, nil
}

// Initializes the database, creates file if not present
func Init(path string) (Database, error) {
  sorm, err := sorm.CreateDatabase(path, true)
  if err != nil {
    return Database{}, err    
  }
  db := Database{Sorm:sorm}
  // Create different tables
  err = db.Sorm.CreateTable(Metadata{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(User{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Zone{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Aisle{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Rack{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Shelf{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Position{})
  if err != nil {
    return Database{}, err
  }


  err = db.Sorm.CreateTable(Category{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Subcategory{})
  if err != nil {
    return Database{}, err
  }
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
  err = db.Sorm.CreateTable(RefreshToken{})
  if err != nil {
    return Database{}, err
  }

  err = db.Sorm.CreateTable(Supplier{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(SupplierCode{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Transition{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Product{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(ProductImage{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Client{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(TicketState{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(TicketType{})
  if err != nil {
    return Database{}, err
  }
  err = db.Sorm.CreateTable(Ticket{})
  if err != nil {
    return Database{}, err
  }

  return db, nil
}

// General query for every table
func (db Database) Insert(rows ...interface{}) error {
  err := db.Sorm.InsertInto(rows...)
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
