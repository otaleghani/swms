package server

import (
	"testing"
	// "github.com/otaleghani/swms/internal/database"
	// "log"
)

var path = "test.db"

func TestServe(t *testing.T) {
	// _, err := database.Init(path)
	// if err != nil {
	//   log.Println("ERROR: ", err)
	//   return
	// }
	// dbConn.Insert(database.Item{
	//   Id:"asd3",
	//   Name:"asd",
	//   Description:"asd",
	//   Archive: false,
	//   Position_id:"asd",
	//   Category_id:"asd",
	//   SubCategory_id:"asd",
	// })

	// item, err := dbConn.SelectItem("")
	// if err != nil {
	//   t.Fatal(err)
	// }
	// log.Println(item)
	Serve("test.db", "8080")
}
