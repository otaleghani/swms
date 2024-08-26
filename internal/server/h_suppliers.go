package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

func getSuppliers(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectSuppliers("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Data: rows}.r200(w, r)
	}
}

func getSupplierById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectSuppliers("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func postSuppliers(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Supplier
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
    SuccessResponse{Message: "Row added", Data: UniqueId{UUID: data.Id}}.r201(w, r)
	}
}

func putSupplier(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectSuppliers("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Supplier
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

func deleteSupplier(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectSuppliers("Id = ?", path)
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

func getSuppliersWithData(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
    suppliers, err := db.SelectSuppliers("");
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
      return
    }
    var data []struct {
      Supplier database.Supplier `json:"supplier"`
      Codes_count int `json:"codes_count"`
    }
    for i := 0; i < len(suppliers); i++ {
      // select suppliercodes based on the supplier, count them
      codes, err := db.SelectSupplierCodes("Supplier_id = ?", suppliers[i].Id)
      if err != nil {
        ErrorResponse{Message: err.Error()}.r500(w, r)
        return
      }
      data = append(data, struct{
        Supplier database.Supplier `json:"supplier"`
        Codes_count int `json:"codes_count"`
      }{
        Supplier: suppliers[i],
        Codes_count: len(codes),
      })
    }
    SuccessResponse{Data: data}.r200(w, r)
  }
}
