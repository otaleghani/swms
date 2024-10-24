package database

type Item struct {
  Id string                 `json:"id"`
  Name string               `json:"name"`
  Description string        `json:"description"`
  IsArchive bool              `json:"isArchive"`
  Zone_id string            `json:"zone"`
  Aisle_id string           `json:"aisle"`
  Rack_id string            `json:"rack"`
  Shelf_id string           `json:"shelf"`
  Category_id string        `json:"category"`
  Subcategory_id string     `json:"subcategory"`
}

// Select an item based on the condition and the args
func (db *Database) SelectItems(condition string, args ...interface{}) ([]Item, error) {
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

func (db *Database) SelectItemsByCategoryId(id string) ([]Item, error) {
  list := []Item{}
  err := db.Sorm.Select(&list, "Category_id = ?", id)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectItemsBySubcategoryId(id string) ([]Item, error) {
  list := []Item{}
  err := db.Sorm.Select(&list, "Subcategory_id = ?", id)
  if err != nil {
    return nil, err
  }
  return list, nil
}
