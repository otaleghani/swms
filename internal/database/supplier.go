package database

type Supplier struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
}

type SupplierCode struct {
  Id string `json:"id"`
  Code string `json:"code"`
  Supplier_id string `json:"supplier"`
  Variant_id string `json:"variant"`
}

func (db *Database) SelectSuppliers(condition string, args ...interface{}) ([]Supplier, error) {
  list := []Supplier{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectSupplierById(id string) ([]Supplier, error) {
  list := []Supplier{}
  err := db.Sorm.Select(&list, "Category_id = ?", id)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectSupplierCodes(condition string, args ...interface{}) ([]SupplierCode, error) {
  list := []SupplierCode{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectSupplierCodeByItemId(id string) ([]SupplierCode, error) {
  list := []SupplierCode{}
  err := db.Sorm.Select(&list, "Item_id = ?", id)
  if err != nil {
    return nil, err
  }
  return list, nil
}
