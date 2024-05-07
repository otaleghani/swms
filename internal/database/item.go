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
  "fmt"
  // "database/sql"
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

func PostItem(path string, item Item) error {
  query := fmt.Sprintf(`
    INSERT INTO item(id, name, description, archived, position_id, category_id, subcategory_id) 
    VALUES("%v", "%v", "%v", %t, "%v", "%v", "%v")
    `, 
    sanitizeInput(item.Id), 
    sanitizeInput(item.Name), 
    sanitizeInput(item.Description),
    item.Archived,
    sanitizeInput(item.Position_id),
    sanitizeInput(item.Category_id),
    sanitizeInput(item.SubCategory_id),
  )

  err := queryExec(query, path)
  if err != nil {
    return err
  }
  
  return nil
}

func GetItems(path string) ([]Item, error) {
  query := "SELECT * FROM item"

  result, err := queryItems(query, path)
  if err != nil {
    return []Item{}, err
  }
  parsedResult, _ := parseItem(result)
  
  return parsedResult, nil
}

func GetItemById(path string, idItem string) (Item, error) {
  query := fmt.Sprintf("SELECT * FROM item WHERE id = %s", idItem)

  result, err := queryItems(query, path)
  if err != nil {
    return Item{}, err
  }
  trueResult, _ := parseItem(result)

  return trueResult[0], nil
}

func PutItem(path string, item Item) error {
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

  err := queryExec(query, path)
  if err != nil {
    return err
  }
  return nil
}

func DeleteItem(path string, id string) error {
  query := fmt.Sprintf("DELETE FROM items WEHERE id = %s", id)

  err := queryExec(query, path)
  if err != nil {
    return err
  }
  return nil 
}
