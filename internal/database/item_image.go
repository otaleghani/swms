package database

type Item_image struct {
  Id string `json:"id"`
  Uri string `json:"uri"`
  Item_id string `json:"item_id"`
  // Variant_id string `json:"variant_id"`
}

func (db *Database) SelectItemImages(condition string, args ...interface{}) ([]Item_image, error) {
  list := []Item_image{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db Database) SelectItemImageById(id string) (Item_image, error) {
  list := []Item_image{}
  err := db.Sorm.Select(&list, "Item_Id = ?", id)
  if err != nil {
    return Item_image{}, err
  }
  return list[0], nil
}

// From a given id gets all the images
func (db Database) SelectItemImagesByItemId(id string) ([]Item_image, error) {
  list := []Item_image{}
  err := db.Sorm.Select(&list, "Item_Id = ?", id)
  if err != nil {
    return []Item_image{}, err
  }
  return list, nil
}
