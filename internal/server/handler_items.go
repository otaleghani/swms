package server

import (
	"encoding/json"
	"net/http"

	"github.com/otaleghani/swms/internal/database"
)

func deleteItem(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		path := r.PathValue("id")
		rows, err := db.SelectItem("Id = ?", path)
    if err != nil {
      ErrorResponse{Message: "Not found"}.r500(w, r)
      return
    }
		if len(rows) == 0 {
      ErrorResponse{Message: "Not found"}.r404(w, r)
      return
		}
    err = db.Delete(rows[0], "Id = ?", path)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
      return
    }
    SuccessResponse{Message: "Item deleted"}.r200(w, r)
  }
}

func postItems(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
	  var data database.Item
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
      ErrorResponse{Message: err.Error()}.r400(w, r)
      return
		}
    err = db.Insert(data)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
      return
    }
    SuccessResponse{Message: "Item added"}.r201(w, r)
  }
}

func getItems(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.SelectItem("")
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
      return
    }
    SuccessResponse{Data: rows}.r200(w, r)
  }
}

func getItemById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		path := r.PathValue("id")
		rows, _ := db.SelectItem("Id = ?", path)
		if len(rows) == 0 {
      ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func putItem(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    rows, err := db.SelectItem("Id = ?", id)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
      return
    }
		if len(rows) == 0 {
      ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
	  var data database.Item
		err = json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
      ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}
    err = db.Update(data, "Id = ?", id)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
			return
    }
    SuccessResponse{Message: "Item updated"}.r200(w, r)
  }
}
