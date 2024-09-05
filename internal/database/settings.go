package database

type Settings struct {
  Id string `json:"id"`
  Unit_weight string `json:"unit_weight"`
  Unit_length string `json:"unit_length"`
  Wizard bool `json:"wizard"`
}

func (db *Database) SelectSettings() (Settings, error) {
  list := []Settings{}
  err := db.Sorm.Select(&list, "Id = ?", "base")
  if err != nil {
    return Settings{}, err
  }
  return list[0], nil
}

func (db *Database) UpdateSettings(new Settings) error {
  err := db.Update(new, "Id = ?", "base")
  if err != nil {
    return err
  }
  return nil
}
