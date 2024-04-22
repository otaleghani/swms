package database

import (
  "sync"
  "database/sql"
)

type Database struct {
  // Path string
  Mux sync.RWMutex
  Connection *sql.DB
}
