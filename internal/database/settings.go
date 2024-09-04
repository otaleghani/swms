package database

type Settings struct {
  Id string `json:"id"`
  Unit_weight string `json:"unit_weight"`
  Unit_length string `json:"unit_length"`
}

func (db *Database) SelectClients(condition string, args ...interface{}) ([]Client, error) {
  list := []Client{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}
