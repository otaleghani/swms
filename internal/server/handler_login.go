package server

import (
  "fmt"
  "encoding/json"
  "net/http"
	"github.com/otaleghani/swms/internal/database"
)

type Login struct {
  Email string `json:"email"`
  Password string `json:"password"`
}

type Response struct {
  AccessToken string `json:"accessToken"`
  RefreshToken string `json:"refreshToken"`
}
    

func login(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    body := Login{}
    err := json.NewDecoder(r.Body).Decode(&body)
    if err != nil {
      http.Error(w, fmt.Sprintf("400: %v", err), 400)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 400)
			return
    }

    err = db.CheckUser(body.Email, body.Password)
    if err != nil {
      http.Error(w, fmt.Sprintf("403: %v", err), 403)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 403)
			return
    }

    accessToken, err := getAccessToken(body.Email)
    if err != nil {
      http.Error(w, fmt.Sprintf("500: %v", err), 500)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 500)
			return
    }
    refreshToken, err := getRefreshToken(body.Email)
    if err != nil {
      http.Error(w, fmt.Sprintf("500: %v", err), 500)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 500)
			return
    }

    encodedResp, err := json.Marshal(Response{
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    })
    if err != nil {
      http.Error(w, fmt.Sprintf("500: %v", err), 500)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 500)
			return
    }

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		w.Write(encodedResp)
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
  }
}
