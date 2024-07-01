package database

import ()

type TicketState struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
}

type TicketType struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
}

type Ticket struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
  OpenData string `json:"open_data"`
  CloseData string `json:"close_data"` 
  Client_id string `json:"client"`
  Product_id string `json:"product"`
  TicketType_id string `json:"type"`
  TicketState_id string `json:"state"`
}

func (db *Database) SelectTicketStates(condition string, args ...interface{}) ([]TicketState, error) {
  list := []TicketState{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectTicketTypes(condition string, args ...interface{}) ([]TicketType, error) {
  list := []TicketType{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}

func (db *Database) SelectTickets(condition string, args ...interface{}) ([]Ticket, error) {
  list := []Ticket{}
  err := db.Sorm.Select(&list, condition, args...)
  if err != nil {
    return nil, err
  }
  return list, nil
}
