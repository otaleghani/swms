package database

type Item struct {
  Id string                 `json:"id"`
  Name string               `json:"name"`
  Description string        `json:"description"`
  Archive bool              `json:"archive"`
  Position_id string        `json:"position"`
  Category_id string        `json:"category"`
  Subcategory_id string     `json:"subcategory"`
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

func (db *Database) SelectItemById(id string) (Item, error) {
  list := []Item{}
// Select a single item based on the id
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Item{}, err
  }
  return list[0], nil
}

func (db *Database) InsertItem(i Item) error {
  // There is no "nil" 

  
  err := db.Sorm.InsertInto(row...)
  if err != nil {
    return err
  }
  return nil
}

// POST, GET, PUT, DELETE
// INSERT, SELECT, UPDATE, DELETE
