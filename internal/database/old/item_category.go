package database

import (
// "log"
// "database/sql"
// _ "github.com/mattn/go-sqlite3"
)

type Category struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

const createTableCategory = `
  CREATE TABLE IF NOT EXISTS item (
    id            TEXT PRIMARY KEY,
    name          TEXT,
    description   TEXT,
  );  
`
