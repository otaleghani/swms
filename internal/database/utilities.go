/********************************************************************

Author      Oliviero Taleghani
Date        2024-05-07

Description
A series of helper function used manage a db.

Usage

func checkString(str sql.NullString) string {
  Used to check if a row column is a valid string. Deprecated.

func checkBool(bool sql.NullBool) bool {
  Used to check if a row column is a valid boolean. Deprecated.

func sanitizeInput(input string) string {
  Used to sanitize string inputs by escaping every dangerous char.

func queryExec(query string, path string) error {
  Executs the given query to the db at the given path. Used for
  database modification that do not yield a rows result.

func queryItems(query string, path string) (t [][]interface{}, err error)
  Executs the given query to the db at the given path. Used for
  database modification that do yield a rows result. This result
  should be parsed with the respective parser for the correct
  structure.
  
Todo
- [x] Cleanup

Dependency
	"database/sql"
	"strings"

Changelog 
  [0.0.2]   2024-05-08
  Chore     Clenup and comments

  [0.0.1]   2024-05-07
  Added     Initial release

********************************************************************/

package database

import (
	"database/sql"
	"strings"
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

func queryItems(
  query string,
  path string,
) (result [][]interface{}, err error) {

	dbConnection, err := sql.Open("sqlite3", path)
	if err != nil {
		return result, err
	}
	defer dbConnection.Close()

	statement, err := dbConnection.Prepare(query)
	if err != nil {
		return result, err
	}
	defer statement.Close()

	rows, err := statement.Query()
	if err != nil {
		return result, err
	}
	defer rows.Close()

	columns, err := rows.Columns()
	if err != nil {
		return result, err
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
			return result, err
		}

		values := make([]interface{}, len(columns))
		for i, col := range scanArgs {
			values[i] = *col.(*interface{})
		}
		result = append(result, values)
	}

	return result, nil
}
