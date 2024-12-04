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
  err = db.Sorm.CreateTable(Unit{})
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
  err = db.Sorm.CreateTable(Operation{})
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

  // Settings neeed
  err = db.Sorm.CreateTable(Settings{})
  if err != nil {
    return Database{}, err
  }

  // Add default units
  baseUnits := []Unit{
    // Metric System
    {Id: "mm", Type: "length", Ratio: 1, UnitSystem: MetricSystem},
    {Id: "m", Type: "length", Ratio: 1000, UnitSystem: MetricSystem},         // 1 m = 1,000 mm
    {Id: "km", Type: "length", Ratio: 1000000, UnitSystem: MetricSystem},     // 1 km = 1,000,000 mm
    
    // Imperial System
    {Id: "thou", Type: "length", Ratio: 0.0254, UnitSystem: ImperialSystem},  // 1 thou = 0.0254 mm
    {Id: "inch", Type: "length", Ratio: 25.4, UnitSystem: ImperialSystem},    // 1 inch = 25.4 mm
    {Id: "foot", Type: "length", Ratio: 304.8, UnitSystem: ImperialSystem},   // 1 foot = 304.8 mm
    {Id: "yard", Type: "length", Ratio: 914.4, UnitSystem: ImperialSystem},   // 1 yard = 914.4 mm

    // Metric System
    {Id: "mg", Type: "weight", Ratio: 0.001, UnitSystem: MetricSystem},       // 1 mg = 0.001 g
    {Id: "g", Type: "weight", Ratio: 1, UnitSystem: MetricSystem},
    {Id: "kg", Type: "weight", Ratio: 1000, UnitSystem: MetricSystem},        // 1 kg = 1,000 g
    {Id: "t", Type: "weight", Ratio: 1000000, UnitSystem: MetricSystem},      // 1 t = 1,000,000 g
    
    // Imperial System
    {Id: "oz", Type: "weight", Ratio: 28.3495, UnitSystem: ImperialSystem},   // 1 oz = 28.3495 g
    {Id: "lb", Type: "weight", Ratio: 453.592, UnitSystem: ImperialSystem},   // 1 lb = 453.592 g
    {Id: "ton", Type: "weight", Ratio: 907185, UnitSystem: ImperialSystem},   // 1 ton = 907,185 g
  }

  for _, v := range baseUnits {
    err = db.Insert(v)
    if err != nil {
      return Database{}, err
    }
  }

  baseSettings := Settings{
    Id: "base",
    UnitSystem: MetricSystem,
    Unit_Length_id: "g",
    Unit_Weight_id: "mm",
    Wizard: true,
  }
  err = db.Insert(baseSettings)
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
