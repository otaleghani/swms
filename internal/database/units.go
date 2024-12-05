package database

// I could for example for every single unit have the "ratio to smallest". 
// Here I could save in database before ratio.

type UnitSystem string

const (
  MetricSystem UnitSystem = "metric"
  ImperialSystem UnitSystem = "imperial"
)

type Unit struct {
  Id string `json:"id"`
  Type string `json:"type"`
  // The ratio from smallest unit to current unit (grams or millimiters)
  Ratio float64 `json:"ratio"`
  UnitSystem UnitSystem `json:"system"`
}


func (db *Database) SelectUnits(condition string, args...interface{}) ([]Unit, error) {
  list := []Unit{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectUnitById(id string) (Unit, error) {
  list := []Unit{}
  if id == "" {
    settings, err := db.SelectSettings()
    if err != nil {
      return Unit{}, err
    }
    err = db.Sorm.Select(&list, "Id = ?", settings.Unit_Length_id)
    if err != nil {
      return Unit{}, err
    }
  }
  err := db.Sorm.Select(&list, "Id = ?", id)
  if err != nil {
    return Unit{}, err
  }
  return list[0], nil
}
