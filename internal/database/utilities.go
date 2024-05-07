/*

Author      Oliviero Taleghani
Date        2024-05-07

Description
A series of helper function used manage a db.

Todo
- [x] Method to create DB table based on the struct 
- [ ] Method to parse different kind of data to respective struct
- [ ] Queries based on the underlying structure
*/


package database

import (
  "database/sql"
  "strings"
  "reflect"
  "fmt"
  "strconv"
)

type Table interface{}

func checkString(str sql.NullString) string {
  if str.Valid {
    return str.String
  } else {
    return ""
  }
}

func checkBool(bool sql.NullBool) bool {
  if bool.Valid {
    return bool.Bool
  } else {
    return false
  }
}

func sanitizeInput(input string) string {
  specialChars := []string{"'", "\"", "\\", ";", "--", "/*", "*/"}

  for _, char := range specialChars {
    input = strings.ReplaceAll(input, char, "\\"+char)
  }

  return input
}

func queryExec(query string, path string) error {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()

  statement, statementErr := dbConnection.Prepare(query)
  if statementErr != nil {
    return statementErr
  }
  defer statement.Close()

  _, execErr := statement.Exec()
  if execErr != nil {
    return execErr
  }

  return nil
}

func queryItems(query string, path string) (t [][]interface{}, err error) {
  // Opens the db connection
  dbConnection, err := sql.Open("sqlite3", path)
  if err != nil {
    return t, err
  } 
  defer dbConnection.Close()
  
  // Prepares the statement
  statement, err := dbConnection.Prepare(query)
  if err != nil {
    return t, err
  }
  defer statement.Close()

  // Executes the statement by quering the db
  rows, err := statement.Query()
  if err != nil {
    return t, err
  }
  defer rows.Close()

  // returns the column names
  columns, err := rows.Columns()
  if err != nil {
    return t, err
  }

  // creates an array of interface
  scanArgs := make([]interface{}, len(columns))
  for i := range scanArgs {
    var v interface{}
    scanArgs[i] = &v
  }

  // Uses scanArgs as a way to place the results of the scan
  for rows.Next() {
    err = rows.Scan(scanArgs...)
    if err != nil {
      return t, err
    }

    values := make([]interface{}, len(columns))
    for i, col := range scanArgs {
      values[i] = *col.(*interface{})
    }
    t = append(t, values)
  }

  return t, nil
}

func parseItem(t [][]interface{}) (result []Item, err error) {
  var base Item
  structType := reflect.TypeOf(base)

  for j := 0; j < len(t); j++ {
    currentVal := t[j]
    for i := 0; i < structType.NumField(); i++ {
      fieldType := structType.Field(i)
      fieldValue := reflect.ValueOf(&base).Elem().FieldByName(fieldType.Name)
      if fieldValue.CanSet() {
        if reflect.ValueOf(base).Field(i).Kind() == reflect.Bool {
          if currentVal[i] == 1 {
            fieldValue.Set(reflect.ValueOf(true))
          } else {
            fieldValue.Set(reflect.ValueOf(false))
          }
        } else { 
          fieldValue.Set(reflect.ValueOf(currentVal[i]))
        }
      }
    }
    result = append(result, base)
  }

  return result, nil
}

func create(t Table) (string, error) {
  val := reflect.ValueOf(t)
  typ := reflect.TypeOf(t)

  query := "CREATE TABLE IF NOT EXISTS " + strings.ToLower(typ.Name()) + " (\n"

  for i := 0; i < val.NumField(); i++ {
    query = query + "\t" + strings.ToLower(typ.Field(i).Name)

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
  }

  query = query[:len(query)-2]
  // Delets the last comma

  query = query + "\n);"
  // Ends the statement

  fmt.Printf(query)
  return query, nil
}

// BASIC QUERIES

func add(t Table, p string) error {
  val := reflect.ValueOf(t)
  typ := reflect.TypeOf(t)

  var fields []string
  var values []string

  for i := 0; i < val.NumField(); i++ {
    fields = append(fields, strings.ToLower(typ.Field(i).Name))

    switch val.Field(i).Kind() {
    case reflect.Int:
      values = append(values, strconv.FormatInt(val.Field(i).Int(), 10))
    case reflect.String:
      values = append(values, "\"" + val.Field(i).String() + "\"")
    case reflect.Float64:
      values = append(values, strconv.FormatFloat(val.Field(i).Float(),'f', -1, 64))
    case reflect.Bool:
      values = append(values, strconv.FormatBool(val.Field(i).Bool()))
    }
  }

  q := fmt.Sprintf(
    "INSERT INTO %v(%v) VALUES(%v)", 
    strings.ToLower(typ.Name()),
    strings.Join(fields, ", "),
    strings.Join(values, ", "),
  )
  fmt.Println(q)

  err := queryExec(q, p)
  if err != nil {
    return err
  }
  return nil
}

func get(t Table, p string) error {

}

// func update
// func delete
