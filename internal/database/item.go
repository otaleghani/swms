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
  Category_id       string    `json:"category_id"`
  SubCategory_id    string    `json:"subcategory_id"`
}

const createTableItem = `
  CREATE TABLE IF NOT EXISTS item (
    id              TEXT PRIMARY KEY,
    name            TEXT,
    description     TEXT,
    archived        INTEGER,
    position_id     TEXT,
    category_id     TEXT,
    subcategory_id  TEXT
  );  
`

    // FOREIGN KEY(category_id) REFERENCES category(id)
func AddItem(path string, item Item) error {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()
  // Opens database connection
  
  statement, statementErr := dbConnection.Prepare(`
    INSERT INTO item (id, name, description, archived, position_id, category_id, subcategory_id) 
    VALUES (?,?,?,?,?,?,?)
  `)
  if statementErr != nil {
    return statementErr
  }
  defer statement.Close()
  // Prepares the statement and defers the closing of the statement

  _, execErr := statement.Exec(item.Id, item.Name, item.Description, item.Archived, item.Position_id, item.Category_id, item.SubCategory_id)
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
      Category_id:      checkString(category_id),
      SubCategory_id:   checkString(subcategory_id),
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
    Category_id:      checkString(category_id),
    SubCategory_id:   checkString(subcategory_id),
  }
  log.Println(Result)
  return nil
}

func UpdateItem(path string, item Item) error {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()
  // Opens database

  query := "UPDATE item\nSET"
  if item.Name != "" {
    query = fmt.Sprintf("%s name = \"%s\",", query, item.Name)
  } 
  if item.Description != "" {
    query = fmt.Sprintf("%s description = \"%s\",", query, item.Description)
  } 
  if item.Archived != false {
    query = fmt.Sprintf("%s archived = \"%v\",", query, item.Archived)
  } 
  if item.Position_id != "" {
    query = fmt.Sprintf("%s position_id = \"%s\",", query, item.Position_id)
  } 
  if item.Category_id != "" {
    query = fmt.Sprintf("%s category_id = \"%s\",", query, item.Category_id)
  } 
  if item.SubCategory_id != "" {
    query = fmt.Sprintf("%s subcategory_id = \"%s\",", query, item.SubCategory_id)
  } 
  query = query[:len(query)-1]
  query = fmt.Sprintf("%s\nWHERE id = \"%s\";", query, item.Id)

  fmt.Println(query)
  statement, statementErr := dbConnection.Prepare(query)
  defer statement.Close()
  if statementErr != nil {
    return statementErr
  }

  _, execErr := statement.Exec()
  if execErr != nil {
    return execErr
  }
  
  return nil
}

func DeleteProduct(path string, id string)
