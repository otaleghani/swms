package database

type Category struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
}

type Subcategory struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
  Category_id string `json:"category"`
}

func (db *Database) SelectCategories(condition string, args ...interface{}) ([]Category, error) {
  list := []Category{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectCategoryById(id string) (Category, error) {
  list := []Category{}
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Category{}, err
  }
  return list[0], nil
}

func (db *Database) SelectSubcategories(condition string, args ...interface{}) ([]Subcategory, error) {
  list := []Subcategory{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectSubcategoryById(id string) (Subcategory, error) {
  list := []Subcategory{}
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Subcategory{}, err
  }
  return list[0], nil
}
