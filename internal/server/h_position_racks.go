package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
  "github.com/otaleghani/spg"
)

func getRacks(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectRacks("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Data: rows}.r200(w, r)
	}
}

func getRackById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectRacks("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func postRacks(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Rack
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

func putRack(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectRacks("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Rack
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

func deleteRack(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectRacks("Id = ?", path)
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

type BodyRequestBulkPostRacks struct {
  Number int `json:"number"`
  Zone_id string `json:"zone"`
  Aisle_id string `json:"aisle"`
}

func postBulkRacks(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
    var data BodyRequestBulkPostRacks
    err := json.NewDecoder(r.Body).Decode(&data)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r400(w, r)
      return
    }
    g := spg.New("en-usa")
    var opt = spg.Options{Format: "camel", Separator: "-"}
    var rack database.Rack

    for i := 0; i < data.Number; i++ {
		  rack.Id = uuid.NewString()
      rack.Name = g.Place().City(opt)
      rack.Zone_id = data.Zone_id
      rack.Aisle_id = data.Aisle_id

		  err = db.Insert(rack)
      if err != nil {
        ErrorResponse{Message: err.Error()}.r500(w, r)
        return
      }
    }

		SuccessResponse{Message: "Rows added"}.r201(w, r)
  }
}

func getRacksByAisleWithData(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		path := r.PathValue("id")
    racks, err := db.SelectRacksByAisle(path)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    var data []struct {
      Rack database.Rack `json:"rack"`
      Shelfs_count int `json:"shelfs_count"`
      Items_count int `json:"items_count"`
    }
    for i := 0; i < len(racks); i++ {
      shelfs, err := db.SelectShelfsByRack(racks[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      items, err := db.SelectItem("Rack_id = ?", racks[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Rack database.Rack `json:"rack"`
          Shelfs_count int `json:"shelfs_count"`
          Items_count int `json:"items_count"`
        }{
          Rack: racks[i],
          Shelfs_count: len(shelfs),
          Items_count: len(items),
        },
      )
    }
		SuccessResponse{Data: data}.r200(w, r)
  }
}
