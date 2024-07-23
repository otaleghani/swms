package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
  "github.com/otaleghani/spg"
)

func getAisles(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectAisles("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Data: rows}.r200(w, r)
	}
}

func getAisleById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectAisles("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func postAisles(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Aisle
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}
		data.Id = uuid.NewString()
		err = db.Insert(data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Message: "Row added"}.r201(w, r)
	}
}

func putAisle(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectAisles("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Aisle
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
		SuccessResponse{Message: "Row updated"}.r200(w, r)
	}
}

func deleteAisle(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectAisles("Id = ?", path)
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
		SuccessResponse{Message: "Row deleted"}.r200(w, r)
	}
}

func getAislesByZone(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
    list, err := db.SelectAislesByZone(path)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(list) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: list}.r200(w, r)
  }
}

type BodyRequestBulkPostAisles struct {
  Number int `json:"number"`
  Zone_id string `json:"zone"`
}

func postBulkAisles(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }

    var data BodyRequestBulkPostAisles
    err := json.NewDecoder(r.Body).Decode(&data)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r400(w, r)
      return
    }

    g := spg.New("en-usa")
    var opt = spg.Options{Format: "camel", Separator: "-"}
    var aisle database.Aisle

    for i := 0; i < data.Number; i++ {
		  aisle.Id = uuid.NewString()
      aisle.Name = g.Place().State(opt)
      aisle.Zone_id = data.Zone_id

		  err = db.Insert(aisle)
      if err != nil {
        ErrorResponse{Message: err.Error()}.r500(w, r)
        return
      }
    }

		SuccessResponse{Message: "Rows added"}.r201(w, r)
  }
}

func getAislesWithData(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		aisles, err := db.SelectAisles("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    var data []struct {
      Aisle database.Aisle `json:"aisle"`
      Racks_count int `json:"racks_count"`
      Items_count int `json:"items_count"`
    }
    for i := 0; i < len(aisles); i++ {
      racks, err := db.SelectRacksByAisle(aisles[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      items, err := db.SelectItem("Aisle_id = ?", aisles[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Aisle database.Aisle `json:"aisle"`
          Racks_count int `json:"racks_count"`
          Items_count int `json:"items_count"`
        }{
          Aisle: aisles[i],
          Racks_count: len(racks),
          Items_count: len(items),
        },
      )
    }
		SuccessResponse{Data: data}.r200(w, r)
  }
}
