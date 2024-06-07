package database

type Item struct {
  Id string
  Name string
  Description string
  Archive bool
  Position_id string
  Category_id string
  Subcategory_id string
}

// Select an item based on the condition and the args
func (db *Database) SelectItem(condition string, args ...interface{}) ([]Item, error) {
  list := []Item{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

// Select a single item based on the id
func (db *Database) SelectItemById(id string) (Item, error) {
  list := []Item{}
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Item{}, err
  }
  return list[0], nil
}

// POST, GET, PUT, DELETE
// INSERT, SELECT, UPDATE, DELETE
