/********************************************************************

Author      Oliviero Taleghani
Date        2024-05-08

Description
Part of the database package. Responsible for parsing the resulting
[][]interface{}s coming from a non struct-specific query. This
functions are used to convert a general array of interfaces back into
their respective structure.

Usage

func parseItem(rows [][]interface{}) (result []Item, err error)
  Converts [][]interface{} to []Item

Dependency
	"reflect"

Todo
  - [ ]     Add the other types

Changelog
  [0.0.1]   2024-05-08
  Added     Initial release

********************************************************************/
package database

import (
	"reflect"
)

func parseItem(rows [][]interface{}) (result []Item, err error) {
	var base Item
	structType := reflect.TypeOf(base)

	for j := 0; j < len(rows); j++ {
		currentVal := rows[j]
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

func Select(ref *[]Table, table Table, path string, where string) error {
  result, err := get(ref, path, where)
  if err != nil {
    return err
  }

  err = parseGeneral(result, ref)
  if err != nil {
    return err
  }

  return nil
}

func parseGeneral(rows [][]interface{}, ref *[]Table) error {
	structType := reflect.TypeOf(ref)
  val := reflect.ValueOf(ref)
  base := reflect.New(val.Type()).Elem()
  var result2 []interface{}

	for j := 0; j < len(rows); j++ {
		currentVal := rows[j]
		for i := 0; i < structType.NumField(); i++ {
			fieldType := structType.Field(i)
			fieldValue := reflect.ValueOf(&base).Elem().FieldByName(fieldType.Name)
			if fieldValue.CanSet() {
				fieldValue.Set(reflect.ValueOf(currentVal[i]))
        result2 = append(result2,reflect.ValueOf(currentVal[i]))
			}
		}
    slice := *ref
		slice = append(slice, result2)
    ref = &slice
    // ref = reflect.Append(ref, base)
	}

	return nil
}
