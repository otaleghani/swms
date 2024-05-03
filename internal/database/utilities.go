package database

import (
  "database/sql"
)

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
