package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

type SupplierCodesFilters struct {
  Search string `json:"search,omitempty"`
  Supplier string `json:"supplier,omitempty"`
}

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

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters SupplierCodesFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.Supplier != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Supplier", filters.Supplier)
        }
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    // Pagination
    queryPaginationOff := r.URL.Query().Get("paginationOff")
    if queryPaginationOff == "true" {
      // if paginationOff is set to "true", returns the data
      // without pagination
		  SuccessResponse{Data: rows}.r200(w, r)
      return
    }
    queryPage := r.URL.Query().Get("page")
    queryPerPage := r.URL.Query().Get("perPage")
    resultedItems, page, perPage, totalItems, totalPages, err := 
      paginateItems(queryPage, queryPerPage, filteredRows)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{
      Data: resultedItems,
      Page: page,
      PerPage: perPage,
      TotalItems: totalItems,
      TotalPages: totalPages,
    }.r200(w, r)
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
    SuccessResponse{Message: "Row added", Data: UniqueId{UUID: data.Id}}.r201(w, r)
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

func getSupplierCodesWithExtra(db *database.Database) http.HandlerFunc {
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

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := supplierCodes
    if queryFilters != "" {
		  var filters ZonesFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    // Construct supplier codes data
    var data []struct {
      Supplier_code database.SupplierCode `json:"supplier_code"`
      Supplier_name string `json:"supplier_name"`
    }
    for i := 0; i < len(filteredRows); i++ {
      supplier, err := db.SelectSupplierById(filteredRows[i].Supplier_id)
      if err != nil {
        ErrorResponse{Message: err.Error()}.r500(w, r)
        return
      }
      data = append(data, struct{
        Supplier_code database.SupplierCode `json:"supplier_code"`
        Supplier_name string `json:"supplier_name"`
      }{
        Supplier_code: filteredRows[i],
        Supplier_name: supplier.Name,
      })
    }

    // Pagination
    queryPaginationOff := r.URL.Query().Get("paginationOff")
    if queryPaginationOff == "true" {
      // if paginationOff is set to "true", returns the data
      // without pagination
		  SuccessResponse{Data: data}.r200(w, r)
      return
    }
    queryPage := r.URL.Query().Get("page")
    queryPerPage := r.URL.Query().Get("perPage")
    resultedItems, page, perPage, totalItems, totalPages, err := 
      paginateItems(queryPage, queryPerPage, data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{
      Data: resultedItems,
      Page: page,
      PerPage: perPage,
      TotalItems: totalItems,
      TotalPages: totalPages,
    }.r200(w, r)
  }
}

type SupplierCodesWithVariant struct {
  Variant database.Variant `json:"variant"`
  Codes []database.SupplierCode `json:"codes"`
}

type SupplierCodesWithItem struct {
  Item database.Item `json:"item"`
  Variants []SupplierCodesWithVariant `json:"variants"`
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
        // Find all the variants
        variants, err := db.SelectVariants("Item_id = ?", item.Id)
        if err != nil {
          ErrorResponse{Message: err.Error()}.r500(w, r)
          return
        }
        // Find all the codes for every variant
        var codesWithVariant []SupplierCodesWithVariant
        for k := 0; k < len(variants); k++ {
          codes, err := db.SelectSupplierCodes("Variant_id = ?", variants[k].Id)
          if err != nil {
            ErrorResponse{Message: err.Error()}.r500(w, r)
            return
          }
          codesWithVariant = append(codesWithVariant, SupplierCodesWithVariant{
            Variant: variants[k],
            Codes: codes,
          })
        }

        data = append(data, SupplierCodesWithItem{
          Item: item,
          Variants: codesWithVariant,
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
