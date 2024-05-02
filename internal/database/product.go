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
  - [ ]     Create all basic queries

Changelog
  [0.0.1]   2024-05-02
  Added     File added

*********************************************************************/

package database

import (
//  "log"
//  "reflect"
//  "strings"
//  "database/sql"
//  _ "github.com/mattn/go-sqlite3"
)

type Product struct {
  Id int `json:"id"`
  Name string `json:"name"`
}

// func AddProduct(path string, prod product) error {}
// func GetSingleProduct
// func GetListProduct
// func UpdateProduct
// func DeleteProduct
