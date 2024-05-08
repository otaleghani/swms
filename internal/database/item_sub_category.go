package database

import (
// "log"
// "database/sql"
// _ "github.com/mattn/go-sqlite3"
)

type SubCategory struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Category_id string `json:"category_id"`
}

const createTableSubCategory = `
  CREATE TABLE IF NOT EXISTS item (
    id            TEXT PRIMARY KEY,
    name          TEXT,
    description   TEXT,
    category_id   TEXT
  );  
`
