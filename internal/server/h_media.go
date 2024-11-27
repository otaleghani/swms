package server

import (
  "strings"
  "net/http"
  "encoding/json"
  "encoding/base64"
  "os"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

func getMedia(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	  //token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    //if err := checkAccessToken(token, db); err != nil {
    //  ErrorResponse{Message: err.Error()}.r401(w, r)
    //  return
    //}
    filePath := "." + r.URL.Path
    if _, err := os.Stat(filePath); os.IsNotExist(err) {
			ErrorResponse{Message: "Not found"}.r404(w, r)
    	return
    }
    http.ServeFile(w, r, filePath)
  }
}

type BodyRequestPostMedia struct {
  // Made Blob an array of strings
  Blob []string `json:"encodedImages"`
  Item_id string `json:"item"`
  // Extention string `json:"extension"`
  // Images: []database.Item_image;
  // Variant_id string `json:"variant_id"`
}

func postItemImage(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
	  token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }

    var req_data BodyRequestPostMedia
    err := json.NewDecoder(r.Body).Decode(&req_data)
    if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
    }



    for _, v := range req_data.Blob {
      var data = database.Item_image{
        Id: uuid.NewString(),
        Item_id: req_data.Item_id,
      }
  	  decodedBlob, err := base64.StdEncoding.DecodeString(v)
	    if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
	    	return
	    }
      fileName := "media/" + data.Id + ".jpg"
      file, err := os.Create(fileName)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }
      defer file.Close()
      _, err = file.Write(decodedBlob)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }
		  err = db.Insert(data)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
    }

		SuccessResponse{Message: "Row added"}.r201(w, r)
  }
}
