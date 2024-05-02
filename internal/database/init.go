/********************************************************************

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
  "log"
  "reflect"
  "strings"
  "os"
  "database/sql"
  _ "github.com/mattn/go-sqlite3"
)

type tableStruct interface{}

func CreateDatabase(path string) error {
  err := createTable(path, Item{})
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

func createQuery(t tableStruct) (string, error) {
  // Helper function used to create a query based on a struct.
  
  val := reflect.ValueOf(t)
  typ := reflect.TypeOf(t)
  // ValueOf is used to get encapsulated value for inspection. We will
  // use it to get the Fields name Kind
  // TypeOf is used to examine the type information. 

  query := "CREATE TABLE IF NOT EXISTS " + strings.ToLower(typ.Name()) + " (\n"

  for i := 0; i < val.NumField(); i++ {
    query = query + "\t" + strings.ToLower(typ.Field(i).Name)
    // Inserts the name into query

    switch val.Field(i).Kind() {
    case reflect.Int:
      query = query + " INTEGER,\n"
    case reflect.String:
      query = query + " TEXT,\n"
    case reflect.Float64:
      query = query + " FLOAT,\n"
    case reflect.Float32:
      query = query + " FLOAT,\n"
    case reflect.Bool:
      query = query + " INTEGER,\n"
    }
    // Then plugs the type by converting the Golang type with the
    // associeted sqlite3 type
  }

  query = query[:len(query)-2]
  // Delets the last comma

  query = query + "\n);"
  // Ends the statement

  log.Printf(query)
  return query, nil
}

func createTable(path string, t tableStruct) error {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()
  // Opens the database connection to the specified path

  query, queErr := createQuery(t)
  if queErr != nil {
    return queErr 
  }
  // Creates the query from the struct

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
