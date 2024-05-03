/********************************************************************

Author      Oliviero Taleghani
Date        2024-05-02

Description
  Database package: products. This file contains all of the code
  regarded the table of products. It contains all the different
  queries used in the application.
  
Usage 

Dependency
  sqlite3   github.com/mattn/go-sqlite3

Todo
  - [x]     Create all basic queries

Changelog
  [0.0.1]   2024-05-02
  Added     File added

*********************************************************************/

package database

import (
  "log"
  "fmt"
  "database/sql"
  _ "github.com/mattn/go-sqlite3"
)

type Item struct {
  Id                string    `json:"id"`
  Name              string    `json:"name"`
  Description       string    `json:"description"`
  Archived          bool      `json:"archived"`
  Position_id       string    `json:"position_id"`
  Category_id       string    `json:category_id`
  SubCategory_id    string    `json:subcategory_id`
}

const createTableItem = `
  CREATE TABLE IF NOT EXISTS item (
    id              TEXT PRIMARY KEY,
    name            TEXT,
    description     TEXT,
    archived        INTEGER,
    position_id     TEXT,
    category_id     TEXT,
    subcategory_id  TEXT,

    FOREIGN KEY(category_id) REFERENCES category(id)
  );  
`



func AddItem(path string, item Item) error {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()
  // Opens database connection

  statement, statementErr := dbConnection.Prepare(`
    INSERT INTO item (id, name) 
    VALUES (?,?)
  `)
  if statementErr != nil {
    return statementErr
  }
  defer statement.Close()
  // Prepares the statement and defers the closing of the statement

  _, execErr := statement.Exec(item.Id, item.Name)
  if execErr != nil {
    return execErr
  }
  // Executes the statement

  return nil
}

func GetItemsList(path string) error {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()
  // Opens database

  rows, statementErr := dbConnection.Query(`
    SELECT * FROM item
  `)
  defer rows.Close()
  if statementErr != nil {
    return statementErr
  }
  // Queries database, defers closing of rows

  var (
    Result          []Item
    id              string
    name            sql.NullString
    description     sql.NullString
    archived        sql.NullBool
    position_id     sql.NullString
    category_id     sql.NullString
    subcategory_id  sql.NullString
  )
  // Declare the returning array and every field of the table

  for rows.Next() {
    err := rows.Scan(
      &id,
      &name,
      &description,
      &archived,
      &position_id,
      &category_id,
      &subcategory_id,
    )
    if err != nil {
      return err
    }
    // Scan each row and append the result into the declared vals

    Result = append(Result, Item{
      Id:               id,
      Name:             checkString(name),
      Description:      checkString(description),
      Archived:         checkBool(archived),
      Position_id:      checkString(position_id),
      Category_id:      checkString(position_id),
      SubCategory_id:   checkString(position_id),
    })
    // Append the result to returning array
  }
  
  log.Println(Result)
  return nil
}

func GetItemSingle(path string, idItem string) error {

  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()
  // Opens database

  query := fmt.Sprintf("SELECT * FROM item WHERE id = %s", idItem)

  rows, statementErr := dbConnection.Query(query)
  defer rows.Close()
  if statementErr != nil {
    return statementErr
  }
  var (
    id              string
    name            sql.NullString
    description     sql.NullString
    archived        sql.NullBool
    position_id     sql.NullString
    category_id     sql.NullString
    subcategory_id  sql.NullString
  )
  rows.Next() 
  err := rows.Scan(
    &id,
    &name,
    &description,
    &archived,
    &position_id,
    &category_id,
    &subcategory_id,
  )
  if err != nil {
    return err
  }

  Result := Item{
    Id:               id,
    Name:             checkString(name),
    Description:      checkString(description),
    Archived:         checkBool(archived),
    Position_id:      checkString(position_id),
    Category_id:      checkString(position_id),
    SubCategory_id:   checkString(position_id),
  }
  log.Println(Result)
  return nil
}

// func UpdateProduct
// func DeleteProduct
