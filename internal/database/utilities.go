/*

To do

- Method to create DB table based on the struct (already present)
- Method to parse different kind of data to respective struct

*/


package database

import (
  "database/sql"
  "strings"
  "reflect"
  "fmt"
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

// func queryItems(query string, path string) (result []Item, err error) {
//   dbConnection, conErr := sql.Open("sqlite3", path)
//   if conErr != nil {
//     return result, conErr
//   } 
//   defer dbConnection.Close()
//   
//   statement, statementErr := dbConnection.Prepare(query)
//   if statementErr != nil {
//     return result, statementErr
//   }
//   defer statement.Close()
// 
//   rows, queryErr := statement.Query()
//   if queryErr != nil {
//     return result, nil
//   }
//   defer rows.Close()
// 
//   var newItem Item
//   // And here 
//   for rows.Next() {
//     scanErr := rows.Scan(
//       &newItem.Id,
//       &newItem.Name,
//       &newItem.Description,
//       &newItem.Archived,
//       &newItem.Position_id,
//       &newItem.Category_id,
//       &newItem.SubCategory_id,
//       // Modify here...
//     )
//     if scanErr != nil {
//       return result, scanErr
//     }
// 
//     result = append(result, newItem)
//   }
// 
//   return result, nil
// }

func queryItems(query string, path string) (t [][]interface{}, err error) {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return t, conErr
  } 
  defer dbConnection.Close()
  
  statement, statementErr := dbConnection.Prepare(query)
  if statementErr != nil {
    return t, statementErr
  }
  defer statement.Close()

  rows, queryErr := statement.Query()
  if queryErr != nil {
    return t, nil
  }
  defer rows.Close()

  columns, err := rows.Columns()
  if err != nil {
    return t, nil
  }

  scanArgs := make([]interface{}, len(columns))
  for i := range scanArgs {
    var v interface{}
    scanArgs[i] = &v
  }

  for rows.Next() {
    scanErr := rows.Scan(scanArgs...)
    if scanErr != nil {
      return t, scanErr
    }

    values := make([]interface{}, len(columns))
    for i, col := range scanArgs {
      values[i] = *col.(*interface{})
    }
    t = append(t, values)
  }

  return t, nil
}

func parseItem(t [][]interface{}) (result []interface{}, err error) {
  // 
  var item Item

  structType := reflect.TypeOf(item)
  fmt.Println(structType)

  for j := 0; j < len(t); j++ {
    currentVal := t[j]
    for i := 0; i < structType.NumField(); i++ {
      fieldType := structType.Field(i)
      fieldValue := reflect.ValueOf(&item).Elem().FieldByName(fieldType.Name)
      if fieldValue.CanSet() {
        if reflect.ValueOf(item).Field(i).Kind() == reflect.Bool {
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
    result = append(result, item)
  }

  return result, nil
}
