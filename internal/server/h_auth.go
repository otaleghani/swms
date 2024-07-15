package server

import (
	"encoding/json"
	// "fmt"
	"net/http"
	// "time"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Auth struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type Revoke struct {
	RefreshToken string `json:"refreshToken"`
}

type Refresh struct {
	RefreshToken string `json:"refreshToken,omitempty"`
	AccessToken  string `json:"accessToken,omitempty"`
}

func login(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body := Login{}
		err := json.NewDecoder(r.Body).Decode(&body)
		if err != nil {
      ErrorResponse{Message: err.Error()}.r400(w, r)
			// http.Error(w, fmt.Sprintf("400: %v", err), 400)
			// logRequest(r.Method, r.URL.Path, r.RemoteAddr, 400)
			return
		}

		err = db.CheckUser(body.Email, body.Password)
		if err != nil {
      ErrorResponse{Message: err.Error()}.r403(w, r)
			// http.Error(w, fmt.Sprintf("403: %v", err), 403)
			// logRequest(r.Method, r.URL.Path, r.RemoteAddr, 403)
			return
		}

		accessToken, err := getAccessToken(body.Email, db)
		if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
			// http.Error(w, fmt.Sprintf("500: %v", err), 500)
			// logRequest(r.Method, r.URL.Path, r.RemoteAddr, 500)
			return
		}
		refreshToken, err := getRefreshToken(body.Email, db)
		if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
			// http.Error(w, fmt.Sprintf("500: %v", err), 500)
			// logRequest(r.Method, r.URL.Path, r.RemoteAddr, 500)
			return
		}

		err = db.Insert(database.RefreshToken{
			Id:    uuid.NewString(),
			Token: refreshToken,
			// Time:    time.Now(),
			Revoked: false,
		})
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    resp := Auth{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
    }
		// encodedResp, err := json.Marshal(Auth{
		// 	AccessToken:  accessToken,
		// 	RefreshToken: refreshToken,
		// })
		// if err != nil {
    //   ErrorResponse{Message: err.Error()}.r500(w, r)
		// 	// http.Error(w, fmt.Sprintf("500: %v", err), 500)
		// 	// logRequest(r.Method, r.URL.Path, r.RemoteAddr, 500)
		// 	return
		// }

		//w.Header().Set("Content-Type", "application/json")
		//w.WriteHeader(200)
		//w.Write(encodedResp)
		//logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
		SuccessResponse{Data: resp}.r200(w, r)
	}
}

func revokeHandler(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body := Revoke{}
		err := json.NewDecoder(r.Body).Decode(&body)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}
		err = db.RevokeToken(body.RefreshToken)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Message: "Token revoked"}.r200(w, r)
	}
}

func refreshHandler(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body := Refresh{}
		err := json.NewDecoder(r.Body).Decode(&body)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}
		if err := checkRefreshToken(body.RefreshToken, db); err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}
		accessToken, err := refreshAccessToken(body.RefreshToken, db)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}
		SuccessResponse{Message: "Token refreshed", Data: Refresh{AccessToken: accessToken}}.r200(w, r)
	}
}
