package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

func getVariants(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectVariants("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Data: rows}.r200(w, r)
	}
}

type VariantsFilter struct {
  Search string `json:"search,omitempty"`
  Item string `json:"item,omitempty"`
}

func getVariantsByItem(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
    path := r.PathValue("id")
    rows, err := db.SelectItemVariants(path)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
      return
    }

    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters VariantsFilter
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        // Here we already are filtering by item
        //if filters.Item != "" {
        //  filteredRows, err = FilterByField(
        //    filteredRows, "Item_id", filters.Item)
        //}
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    queryPaginationOff := r.URL.Query().Get("paginationOff")
    if queryPaginationOff == "true" {
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

func getVariantById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectVariants("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func postVariants(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Variant
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}

    // Get units ratio and calculates the result in the value
    unitLength, err := db.SelectUnitById(data.Unit_Length_id)
    if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
    }
    unitWeight, err := db.SelectUnitById(data.Unit_Weight_id)
    if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
    }
    data.Width = data.Width * unitLength.Ratio
    data.Height = data.Height * unitLength.Ratio
    data.Length = data.Length * unitLength.Ratio
    data.Weight = data.Weight * unitWeight.Ratio

		data.Id = uuid.NewString()
		err = db.Insert(data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Message: "Row added", Data: UniqueId{UUID: data.Id}}.r201(w, r)
	}
}

func putVariant(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectVariants("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Variant
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

func deleteVariant(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectVariants("Id = ?", path)
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
