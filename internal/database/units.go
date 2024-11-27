package database

type Unit struct {
  Id string `json:"id"`
  Type string `json:"type"`
}

func (db *Database) SelectUnits(condition string, args...interface{}) ([]Unit, error) {
  list := []Unit{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}
