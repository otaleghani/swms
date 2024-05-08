/********************************************************************

Author      Oliviero Taleghani
Date        2024-05-08

Description
Part of the database package. Responsible for creating and managing
the basic queries that every single table wants. The underlying idea
is to use the helper function to interact with the database without
the need to create different struct-specific functions and without
the use of an ORM.
Whenever you use those helper functions you are passing a structure
that will be used to parse the fields and the data by using an
interface Table. This interface is just an empty interface so every
single struct can be a viable Table. This is used to replicate the
struct as the DB columns.

Usage

func create(table Table, path string) error 
  Creates an sql table based on the fields of the interface Table on
  the given path

func add(table Table, path string) error
  Adds the passed field to the table of the Table.

func get(table Table, path string, where string) (result [][]interface{}, err error)
  Returns the result of the query. This is used to get one row (by
  specifying the id in table Table), a collection of rows (specifying
  the where string field) or every rows (without specifying anything)
  
func update(table Table, path string) error {
  Updates the row found by looking up table.id into the respective
  sqlite counterpart.

func delete(table Table, path string) error
  Deletes table from its respective table. The first field must be
  the row id

Dependency
	"errors"
	"fmt"
	"reflect"
	"strconv"
	"strings"

Todo
  - [ ] Implement joins

Changelog
  [0.0.1]   2024-05-08
  Added     Initial release

********************************************************************/

package database

import (
	"errors"
	"fmt"
	"reflect"
	"strconv"
	"strings"
)

func create(table Table, path string) error {
	val := reflect.ValueOf(table)
	typ := reflect.TypeOf(table)

	var fields []string

	for i := 0; i < val.NumField(); i++ {
		switch val.Field(i).Kind() {
		case reflect.Int:
			fields = append(
				fields,
				strings.ToLower(typ.Field(i).Name)+" INTEGER",
			)
		case reflect.String:
			fields = append(
				fields,
				strings.ToLower(typ.Field(i).Name)+" TEXT",
			)
		case reflect.Float64:
			fields = append(
				fields,
				strings.ToLower(typ.Field(i).Name)+" FLOAT",
			)
		case reflect.Float32:
			fields = append(
				fields,
				strings.ToLower(typ.Field(i).Name)+" FLOAT",
			)
		case reflect.Bool:
			fields = append(
				fields,
				strings.ToLower(typ.Field(i).Name)+" INTEGER",
			)
		}
	}

	query := fmt.Sprintf(
		"CREATE TABLE IF NOT EXISTS %v (%v);",
		strings.ToLower(typ.Name()),
		strings.Join(fields, ", "),
	)

	if err := queryExec(query, path); err != nil {
		return err
	}

	return nil
}

func add(table Table, path string) error {
	val := reflect.ValueOf(table)
	typ := reflect.TypeOf(table)

	var fields []string
	var values []string

	for i := 0; i < val.NumField(); i++ {
		fields = append(fields, strings.ToLower(typ.Field(i).Name))

		switch val.Field(i).Kind() {
		case reflect.Int:
			values = append(
				values,
				strconv.FormatInt(val.Field(i).Int(), 10),
			)
		case reflect.String:
			values = append(
				values,
				"\""+val.Field(i).String()+"\"",
			)
		case reflect.Float64:
			values = append(
				values,
				strconv.FormatFloat(val.Field(i).Float(), 'f', -1, 64),
			)
		case reflect.Bool:
			values = append(
				values,
				strconv.FormatBool(val.Field(i).Bool()),
			)
		}
	}

	query := fmt.Sprintf(
		"INSERT INTO %v(%v) VALUES(%v)",
		strings.ToLower(typ.Name()),
		strings.Join(fields, ", "),
		strings.Join(values, ", "),
	)

	if err := queryExec(query, path); err != nil {
		return err
	}

	return nil
}

func get(table Table, path string, where string) (result [][]interface{}, err error) {
	query := ""

	if where != "" {
		if reflect.ValueOf(table).Field(0).IsZero() {
			query = fmt.Sprintf(
				"SELECT * FROM %v WHERE %v",
				strings.ToLower(reflect.TypeOf(table).Name()),
				where,
			)
		} else {
			return result, errors.New("Cannot query with both id and query")
		}
	} else {
		if reflect.ValueOf(table).Field(0).IsZero() {
			query = fmt.Sprintf(
				"SELECT * FROM %v",
				strings.ToLower(reflect.TypeOf(table).Name()),
			)
		} else {
			query = fmt.Sprintf(
				"SELECT * FROM %v WHERE id = \"%v\"",
				strings.ToLower(reflect.TypeOf(table).Name()),
				reflect.ValueOf(table).Field(0).String(),
			)
		}
	}

	result, err = queryItems(query, path)
	if err != nil {
		return result, err
	}

	return result, nil
}

func update(table Table, path string) error {
	val := reflect.ValueOf(table)
	typ := reflect.TypeOf(table)

	var values []string

	for i := 1; i < val.NumField(); i++ {
		if !val.Field(i).IsZero() {
			n := strings.ToLower(typ.Field(i).Name)

			switch val.Field(i).Kind() {
			case reflect.Int:
				values = append(
          values,
          fmt.Sprintf(
            "%v = %v",
            n, 
            strconv.FormatInt(val.Field(i).Int(), 10),
          ),
        )
			case reflect.String:
				values = append(
          values,
          fmt.Sprintf("%v = \"%v\"", n, val.Field(i).String()),
        )
			case reflect.Float64:
				values = append(
          values,
          fmt.Sprintf(
            "%v = \"%v\"",
            n,
            strconv.FormatFloat(val.Field(i).Float(), 'f', -1, 64),
          ),
        )
			case reflect.Bool:
				values = append(
          values, 
          fmt.Sprintf(
            "%v = \"%v\"",
            n,
            strconv.FormatBool(val.Field(i).Bool()),
          ),
        )
			}
		}
	}
	query := fmt.Sprintf(
		"UPDATE %v\nSET %v WHERE id = %v",
		strings.ToLower(typ.Name()),
		strings.Join(values, ", "),
		val.Field(0).String(),
	)

	err := queryExec(query, path)
	if err != nil {
		return err
	}
	return nil
}

func delete(table Table, path string) error {
	query := fmt.Sprintf(
		"DELETE FROM %v WHERE id = %s",
		strings.ToLower(reflect.TypeOf(table).Name()),
		reflect.ValueOf(table).Field(0),
	)

	err := queryExec(query, path)
	if err != nil {
		return err
	}
	return nil
}
