// Functions used to create a query based on the content of a go
// struct. The problem that I encountered was that I had to create
// casing for FOREIGN KEYS and other strange SQL functions. So I
// temporarily droped this solution.

func createTable(path string, t tableStruct) error {
  dbConnection, conErr := sql.Open("sqlite3", path)
  if conErr != nil {
    return conErr
  } 
  defer dbConnection.Close()
  // Opens the database connection to the specified path

  query, queErr := createQuery(t)
  if queErr != nil {
    return queErr 
  }
  // Creates the query from the struct

  stat, statErr := dbConnection.Prepare(query)
  if statErr != nil {
    return statErr
  }
  // Prepares the statement...

  _, execErr := stat.Exec()
  if execErr != nil {
    return execErr
  }
  // And then it executes the statement

  return nil
}
