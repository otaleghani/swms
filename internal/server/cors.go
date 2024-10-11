package server

import (
	"net/http"
)

func middlewareCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    //w.Header().Set("Access-Control-Allow-Headers", "*")

    // This is for preflight requests coming from react
    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }
		next.ServeHTTP(w, r)
	})
}
