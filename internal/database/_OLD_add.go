package database

import (
  "log"
  "database/sql"
  _ "github.com/mattn/go-sqlite3"
)


func AddToDatabase(path string) error {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()

  statement, statementErr := dbConnection.Prepare(`
    INSERT INTO products (id, name, lastname) 
    VALUES (2, "alberto", "angela")
  `)
  if statementErr != nil {
    log.Fatal("sql statement Err")
    return statementErr
  }

  statement.Exec()
  return nil
}
