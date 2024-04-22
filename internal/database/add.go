package database

import (
  "log"
)


func (db *Database) AddToDatabase() error {
  db.Mux.Lock()
  defer db.Mux.Unlock()

  statement, statementErr := db.Connection.Prepare(`
    INSERT INTO people (id, firstname, lastname)
    VALUES (2, "alberto", "angela")
  `)
  if statementErr != nil {
    log.Fatal("sql statement Err")
    return(statementErr)
  }

  statement.Exec()
  return nil
}
