package database

import (
  // "encoding/json"
  "fmt"
)

type People struct {
  Id int `json:"id"`
  Firstname string `json:"firstname"`
  Lastname string `json:"lastname"`
}

func (db *Database) GetAll() []People {
  db.Mux.Lock()
  defer db.Mux.Unlock()

  rows, _ := db.Connection.Query(`
    SELECT * FROM people
  `)
  defer rows.Close()

  var Result []People

  for rows.Next() {
    var (
      id int
      firstname string
      lastname string
    )
    err := rows.Scan(&id, &firstname, &lastname)

    if err != nil { 
      fmt.Println("something kaboom")
    }

    Result = append(Result, People{Id: id, Firstname: firstname, Lastname: lastname})
    // fmt.Printf("ID: %d \n firstname: %s \n lastname: %s\n", id, firstname, lastname)
  }

  return Result
}
