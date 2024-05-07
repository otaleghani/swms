/**********************************************************************

Author      Oliviero Taleghani
Date        2024-05-02

Description
  Part of the database package and entry point. Responsible for
  - Creating a new database
  - Deleting an existing database
  
Usage 

Dependency
  sqlite3   github.com/mattn/go-sqlite3

Todo
  - [ ]     
  - [x]     Database creation if no db is present.
  - [x]     Delete database on specified location

Changelog
  [0.0.2]   2024-05-02
  Add       deleteDatabase

  [0.0.1]   2024-05-02
  Added     Initial release

*********************************************************************/

package database

import (
  "os"
  "database/sql"
  _ "github.com/mattn/go-sqlite3"
)

func CreateDatabase(path string) error {
  // err := createTable(path, createTableItem)
  itemQuery, err := create(Item{})
  if err != nil {
    return err
  }
  err = queryExec(itemQuery, path) 
  if err != nil {
    return err
  }

  // Takes the path and an Interface of a struct. Will create the
  // table inside of the database in the specified path.

  return nil
}

func deleteDatabase(path string) error {
  err := os.Remove(path)
  if err != nil {
    return err
  }

  return nil
}

func createTable(path string, query string) error {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()
  // Opens the database connection to the specified path

  stat, statErr := dbConnection.Prepare(query)
  if statErr != nil {
    return statErr
  }
  // Prepares the statement...

  _, execErr := stat.Exec()
  if execErr != nil {
    return execErr
  }
  // And then it executes the statement

  return nil
}
