package server

import (
	"net/http"
	"strings"

	"github.com/otaleghani/swms/internal/database"
)

func getUnits(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectUnits("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

		SuccessResponse{
      Data: rows,
    }.r200(w, r)
	}
}
