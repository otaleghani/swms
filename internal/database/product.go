package database

import ()

type Product struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
  // photos!
}

type ProductImage struct {
  Id string `json:"id"`
  Url string `json:"url"`
  Product_id string `json:"product"`
}

func (db *Database) SelectProducts(condition string, args ...interface{}) ([]Product, error) {
  list := []Product{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectProductImages(condition string, args ...interface{}) ([]ProductImage, error) {
  list := []ProductImage{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}
