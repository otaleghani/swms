package database

type Position struct {
  Id string `json:"id"`
  Zone_id string `json:"zone"`
  Aisle_id string `json:"aisle"`
  Rack_id string `json:"rack"`
  Shelf_id string `json:"shelf"`
}

type Zone struct {
  Id string `json:"id"`
  Name string `json:"name"`
}

type Aisle struct {
  Id string `json:"id"`
  Name string `json:"name"`
}

type Rack struct {
  Id string `json:"id"`
  Name string `json:"name"`
}

type Shelf struct {
  Id string `json:"id"`
  Name string `json:"name"`
}
