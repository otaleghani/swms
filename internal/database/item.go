/********************************************************************

Author      Oliviero Taleghani
Date        2024-05-02

Description
  Part of the database package, containing queries for the item type
  and the struct definition. This queries are struct specific and
  usually contain two parts: the actual query and the parser to
  convert the result.

Usage

Dependency
  sqlite3   github.com/mattn/go-sqlite3
	"fmt"

Todo
  - [x]     Refactor
  - [x]     Create all basic queries

Changelog
  [0.0.2]   2024-05-02
  Chore     Refactor
  
  [0.0.1]   2024-05-02
  Added     File added

*********************************************************************/

package database

import (
	_ "github.com/mattn/go-sqlite3"
  "errors"
)

type Item struct {
	Id             string `json:"id"`
	Name           string `json:"name"`
	Description    string `json:"description"`
	Archived       bool   `json:"archived"`
	Position_id    string `json:"position_id"`
	Category_id    string `json:"category_id"`
	SubCategory_id string `json:"subcategory_id"`
}

func GetItems(item Item, path string, where string) ([]Item, error) {
  result, err := get(item, path, where)
	if err != nil {
		return []Item{}, err
	}

  parsedResult, err := parseItem(result)
	if err != nil {
		return []Item{}, err
	}

	return parsedResult, nil
}

func GetItemById(item Item, path string) (Item, error) {
  if item.Id == "" {
    return Item{}, errors.New("Cannot find if id is not specified")
  }

  result, err := get(item, path, "")
	if err != nil {
		return Item{}, err
	}

  parsedResult, err := parseItem(result)
	if err != nil {
		return Item{}, err
	}

	return parsedResult[0], nil
}

func PutItem(item Item, path string) error {
  if err := update(item, path); err != nil {
    return err
  }

	return nil
}

func DeleteItem(item Item, path string) error {
  err := delete(item, path)
  if err != nil {
    return err
  }

	return nil
}
