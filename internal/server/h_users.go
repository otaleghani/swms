package server

import (
	"encoding/json"
	"net/http"
  "strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

func getUserById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		rows, _ := db.SelectUser("Id = ?", id)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func getUsers(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.SelectUser("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Data: rows}.r200(w, r)
	}
}

func postUsers(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var data database.NewUser
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}
		rows, err := db.SelectUser("Email = ?", data.Email) // Checks if user already exists
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) != 0 {
			ErrorResponse{Message: "Email already in use"}.r403(w, r)
			return
		}
		data.Id = uuid.NewString()

    var dataToInser = database.User(data)
		err = db.InsertUser(dataToInser)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Message: "Item added"}.r201(w, r)
	}
}

func deleteUser(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		rows, err := db.SelectUser("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

		err = db.Delete(rows[0], "Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Message: "Item deleted"}.r200(w, r)
	}
}

func putUser(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		rows, err := db.SelectUser("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.User
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

func getCurrentUser(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}

    email, err := getTokenSubject(token, db)
    if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
    }

		rows, err := db.SelectUser("Email = ?", email)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}
