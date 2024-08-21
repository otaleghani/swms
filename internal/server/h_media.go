package server

import (
  "strings"
  "net/http"
  "os"

	"github.com/otaleghani/swms/internal/database"
)

func getMedia(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	  token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
    filePath := "." + r.URL.Path
    if _, err := os.Stat(filePath); os.IsNotExist(err) {
			ErrorResponse{Message: "Not found"}.r404(w, r)
    	return
    }
    http.ServeFile(w, r, filePath)
  }
}

type BodyRequestPostMedia struct {
  Images: []database.Item_image;
}

func postMedia(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
	  token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }

    // 1. parse the body

    
  }
}
