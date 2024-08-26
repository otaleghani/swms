package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

func getSupplierCodes(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectSupplierCodes("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Data: rows}.r200(w, r)
	}
}

func getSupplierCodeById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectSupplierCodes("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func postSupplierCodes(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.SupplierCode
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

func putSupplierCode(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectSupplierCodes("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.SupplierCode
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

func deleteSupplierCode(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectSupplierCodes("Id = ?", path)
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

func getSupplierCodesWithData(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
    supplierCodes, err := db.SelectSupplierCodes("");
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
      return
    }
    var data []struct {
      Supplier_code database.SupplierCode `json:"supplier_code"`
      Supplier_name string `json:"supplier_name"`
    }
    for i := 0; i < len(supplierCodes); i++ {
      supplier, err := db.SelectSupplierById(supplierCodes[i].Supplier_id)
      if err != nil {
        ErrorResponse{Message: err.Error()}.r500(w, r)
        return
      }
      data = append(data, struct{
        Supplier_code database.SupplierCode `json:"supplier_code"`
        Supplier_name string `json:"supplier_name"`
      }{
        Supplier_code: supplierCodes[i],
        Supplier_name: supplier.Name,
      })
    }
    SuccessResponse{Data: data}.r200(w, r)
  }
}


type SupplierCodesWithItem struct {
  Item database.Item `json:"item"`
  Codes []database.SupplierCode `json:"codes"`
}

func getSupplierCodesBySupplierWithItem(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		path := r.PathValue("id")
    codes, err := db.SelectSupplierCodes("Supplier_id = ?", path)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
      return
    }
    var data []SupplierCodesWithItem
    for i := 0; i < len(codes); i++ {
      result := true;
      for _, j := range data {
        if j.Item.Id == codes[i].Item_id {
          result = false;
        }
      }
      if result {
        item, err := db.SelectItemById(codes[i].Item_id)
        if err != nil {
          ErrorResponse{Message: err.Error()}.r500(w, r)
          return
        }
        codes, err := db.SelectSupplierCodesByItemId(item.Id)
        if err != nil {
          ErrorResponse{Message: err.Error()}.r500(w, r)
          return
        }
        data = append(data, SupplierCodesWithItem{
          Item: item,
          Codes: codes,
        })
      }
    }
		SuccessResponse{Data: data}.r200(w, r)
  }
}

type CodesWithExtra struct {
  SupplierCode database.SupplierCode `json:"supplier_code"`
  SupplierName string `json:"supplier_name"`
}

func getSupplierCodesByItem(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectSupplierCodesByItemId(path)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    var data []CodesWithExtra
    for _, i := range rows {
      supplier, err := db.SelectSupplierById(i.Supplier_id)
      if err != nil {
			  ErrorResponse{Message: err.Error()}.r500(w, r)
			  return
      }
      data = append(data, CodesWithExtra{
        SupplierCode: i,
        SupplierName: supplier.Name,
      })
    }
		SuccessResponse{Data: data}.r200(w, r)
	}
}
