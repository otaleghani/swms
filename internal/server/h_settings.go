package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/otaleghani/swms/internal/database"
)

func getSettings(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectSettings()
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Data: rows}.r200(w, r)
	}
}

func putSettings(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Settings
    err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}
		err = db.UpdateSettings(data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Message: "Row updated"}.r200(w, r)
	}
}
