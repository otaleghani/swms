package database

import ()

type Variant struct {
  Id string
  Name string
  Description string
  Quantity int64
  InternalId string
  Lenght float64
  Width float64
  Height float64
  Default_Variant bool
  Item_id string
}
