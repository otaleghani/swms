package server

import (
	"fmt"
  "log"
	"net/http"
	"time"

	"github.com/otaleghani/swms/internal/database"
)

func Serve(path, port string) {
	// opens db
	dbConn, err := database.Init(path)
	if err != nil {
		log.Println("ERROR: ", err)
		return
	}

  err = generateJwtSecret(20)
  if err != nil {
    log.Println("ERROR: ", err)
    return
  }

	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/v1/items/{$}", getItems(&dbConn))
	mux.HandleFunc("POST /api/v1/items/{$}", postItems(&dbConn))
	mux.HandleFunc("GET /api/v1/items/{id}", getItemById(&dbConn))
	mux.HandleFunc("PUT /api/v1/items/{id}", handleTest)
	mux.HandleFunc("DELETE /api/v1/items/{id}", deleteItem(&dbConn))

  mux.HandleFunc("GET /api/v1/users/{$}", getUsers(&dbConn))
  mux.HandleFunc("POST /api/v1/users/{$}", postUsers(&dbConn))
  mux.HandleFunc("GET /api/v1/users/{id}", getUserById(&dbConn))
  mux.HandleFunc("PUT /api/v1/users/{id}", putUser(&dbConn))
  mux.HandleFunc("DELETE /api/v1/users/{id}", deleteUser(&dbConn))

  mux.HandleFunc("POST /api/v1/login/{$}", login(&dbConn))

	corsMux := middlewareCors(mux)
	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           corsMux,
		ReadTimeout:       time.Second * 5,
		ReadHeaderTimeout: time.Second * 5,
		WriteTimeout:      time.Second * 5,
		IdleTimeout:       time.Second * 5,
	}
  logMsg(fmt.Sprintf("Serving on port: %s", port))
	log.Fatal(srv.ListenAndServe())
}

func handleTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("sandro"))
}

