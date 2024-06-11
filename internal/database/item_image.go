package database

type Item_image struct {
  Id string
  Uri string
  Item_id string
  Variant_id string
}

// From a given id gets all the images
func (db Database) SelectImagesByItemId(id string) ([]Item_image, error) {
  list := []Item_image{}
  err := db.Sorm.Select(&list, "Item_Id = ?", id)
  if err != nil {
    return nil, err
  }
  return list, nil
}
