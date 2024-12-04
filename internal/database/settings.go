package database

type Settings struct {
  Id string `json:"id"`
  UnitSystem UnitSystem `json:"system"`

  // Default unit to use whenever you change from metric to imperial and vice versa
  //DefaultUnitWeight string `json:"defaultUnitWeight"`
  //DefaultUnitLength string `json:"defaultUnitLength"`

  Unit_Length_id string `json:"defaultLengthUnit"`
  Unit_Weight_id string `json:"defaultWeightUnit"`

  // WIP: Used to show the wizard
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
