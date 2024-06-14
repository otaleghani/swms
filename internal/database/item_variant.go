package database

type Variant struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
  Quantity int64 `json:"quantity"`
  InternalId string `json:"internalId"`
  Length float64 `json:"length"`
  Width float64 `json:"width"`
  Height float64 `json:"heigth"`
  DefaultVariant bool `json:"defaultVariant"`
  Item_id string `json:"item_id"`
}

func (db *Database) SelectVariants(condition string, args ...interface{}) ([]Variant, error) {
  list := []Variant{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectVariantById(id string) (Variant, error) {
  list := []Variant{}
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Variant{}, err
  }
  return list[0], nil
}

func (db *Database) SelectItemVariants(item string) ([]Variant, error) {
  list := []Variant{}
  err := db.Sorm.Select(&list, "Item_id = ?", item)
  if err != nil {
    return []Variant{}, err
  }
  return list, nil
}

func (db *Database) SelectDefaultVariant(item string) (Variant, error) {
  list := []Variant{}
  err := db.Sorm.Select(&list, "Item_id = ?, Default_Variant = ?", item, true)
  if err != nil {
    return Variant{}, err
  }
  return list[0], nil
}
