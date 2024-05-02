package database

import (
  "database/sql"
  _ "github.com/mattn/go-sqlite3"
)

type People struct {
  Id int `json:"id"`
  Firstname string `json:"firstname"`
  Lastname string `json:"lastname"`
}

func GetAll(path string) ([]People, error) {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return nil, conErr
  } 
  defer dbConnection.Close()

  rows, _ := dbConnection.Query(`
    SELECT * FROM products
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
      return nil, err
    }

    Result = append(Result, People{Id: id, Firstname: firstname, Lastname: lastname})
  }

  return Result, nil
}
