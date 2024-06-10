package server

import (
// "net/http"
// "encoding/json"
//  "log"

// "github.com/otaleghani/swms/internal/database"
)

type some struct {
	Error string `json:"error"`
}

// func handleAdd(db *database.Database) http.HandlerFunc {
//   return func(w http.ResponseWriter, r *http.Request) {
//     theReturn := some{Error: "it all sunny in pontassieve"}
//
//     err := db.AddToDatabase()
//     if err != nil {
//       theReturn = some{Error: err.Error()}
//     }
//
//
//     data, _ := json.Marshal(theReturn)
//     w.Header().Set("Content-Type", "application/json")
//     w.WriteHeader(200)
//     w.Write(data)
//   }
// }
//
// func handleGet(db *database.Database) http.HandlerFunc {
//   return func(w http.ResponseWriter, r *http.Request) {
//     result := db.GetAll()
//
//     data, _ := json.Marshal(result)
//     w.Header().Set("Content-Type", "application/json")
//     w.WriteHeader(200)
//     w.Write(data)
//   }
// }
