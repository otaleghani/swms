// Functions used to create a query based on the content of a go
// struct. The problem that I encountered was that I had to create
// casing for FOREIGN KEYS and other strange SQL functions. So I
// temporarily droped this solution.

type tableStruct interface{}

func createQuery(t tableStruct) (string, error) {
  // Helper function used to create a query based on a struct.
  
  val := reflect.ValueOf(t)
  typ := reflect.TypeOf(t)
  // ValueOf is used to get encapsulated value for inspection. We will
  // use it to get the Fields name Kind
  // TypeOf is used to examine the type information. 

  query := "CREATE TABLE IF NOT EXISTS " + strings.ToLower(typ.Name()) + " (\n"

  for i := 0; i < val.NumField(); i++ {
    query = query + "\t" + strings.ToLower(typ.Field(i).Name)
    // Inserts the name into query

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
    // Then plugs the type by converting the Golang type with the
    // associeted sqlite3 type
  }

  query = query[:len(query)-2]
  // Delets the last comma

  query = query + "\n);"
  // Ends the statement

  log.Printf(query)
  return query, nil
}

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
