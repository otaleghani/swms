package database

import (
  "database/sql"
  "log"
  _ "github.com/mattn/go-sqlite3"
)

func CreateDatabase(path string) (*Database, error) {
  database, connectionErr := sql.Open("sqlite3", path)
  if connectionErr != nil {
    log.Fatal("sql.Open failure")
    return nil, connectionErr
  }
  db := &Database{Connection: database}

  // HERE YOU NEED TO CHECK IF DB IS ALREADY PRESENT OR NOT
  // IF YES DON'T RUN Database.INIT
  // IF NOT RUN IT

  // Database.Init will be something like create table etc. etc.

  statement, statementErr := database.Prepare(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      lastname TEXT,
    );
    CREATE TABLE IF NOT EXISTS USERS (
      id INTEGER PRIMARY KEY,
      firstname TEXT,
      lastname TEXT,
    );
  `)
  if statementErr != nil {
    log.Fatal("sql.Open failure")
    return nil, statementErr
  }

  statement.Exec()
  return db, nil
}
