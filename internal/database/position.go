package database

type Position struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Zone_id string `json:"zone"`
  Aisle_id string `json:"aisle"`
  Rack_id string `json:"rack"`
  Shelf_id string `json:"shelf"`
}

// A zone is a collection of Aisles
type Zone struct {
  Id string `json:"id"`
  Name string `json:"name"`
}

// An Aisle is a collection of Racks
type Aisle struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Zone_id string `json:"zone"`
}

// A Rack is a collection of Shelfs
type Rack struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Zone_id string `json:"zone"`
  Aisle_id string `json:"aisle"`
}

// A Shelf is the lowest one
type Shelf struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Zone_id string `json:"zone"`
  Aisle_id string `json:"aisle"`
  Rack_id string `json:"rack"`
}

func (db *Database) SelectZones(condition string, args ...interface{}) ([]Zone, error) {
  list := []Zone{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectZoneById(id string) (Zone, error) {
  list := []Zone{}
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Zone{}, err
  }
  return list[0], nil
}

func (db *Database) SelectAisles(condition string, args ...interface{}) ([]Aisle, error) {
  list := []Aisle{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectAisleById(id string) (Aisle, error) {
  list := []Aisle{}
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Aisle{}, err
  }
  return list[0], nil
}

func (db *Database) SelectAislesByZone(id string) ([]Aisle, error) {
  list := []Aisle{}
  err := db.Sorm.Select(&list, "Zone_id = ?", id)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectRacks(condition string, args ...interface{}) ([]Rack, error) {
  list := []Rack{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectRackById(id string) (Rack, error) {
  list := []Rack{}
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Rack{}, err
  }
  return list[0], nil
}

func (db *Database) SelectRacksByAisle(id string) ([]Rack, error) {
  list := []Rack{}
  err := db.Sorm.Select(&list, "Aisle_id = ?", id)
  if err != nil {
    return []Rack{}, err
  }
  return list, nil
}

func (db *Database) SelectShelfs(condition string, args ...interface{}) ([]Shelf, error) {
  list := []Shelf{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return []Shelf{}, err
  }
  return list, nil
}

func (db *Database) SelectShelfById(id string) (Shelf, error) {
  list := []Shelf{}
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Shelf{}, err
  }
  return list[0], nil
}

func (db *Database) SelectShelfByRack(id string) ([]Shelf, error) {
  list := []Shelf{}
  err := db.Sorm.Select(&list, "Rack_id = ?", id)
  if err != nil {
    return nil, err
  }
  return list, nil
}
