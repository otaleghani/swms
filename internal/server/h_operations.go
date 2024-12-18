package server

import (
	"encoding/json"
	"net/http"
	"strings"
  "time"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

type OperationsFilters struct {
  Search string `json:"search,omitempty"`
  User string `json:"user,omitempty"`
  Item string `json:"item,omitempty"`
  Variant string `json:"variant,omitempty"`
  Ticket string `json:"ticket,omitempty"`
  Date DataRange `json:"date,omitempty"`
}

func getOperations(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectOperations("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filters
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
		var filters OperationsFilters
    if queryFilters != "" {
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r400(w, r)
		  	return
		  }
      if filters.Search != "" {
        filteredRows, err = FilterBySearch(
          filteredRows, "Name", filters.Search)
      }
      if filters.User != "" {
        filteredRows, err = FilterByField(
          filteredRows, "User", filters.User)
      }
      if filters.Item != "" {
        filteredRows, err = FilterByField(
          filteredRows, "Item", filters.Item)
      }
      if filters.Variant != "" {
        filteredRows, err = FilterByField(
          filteredRows, "Variant", filters.Variant)
      }
      if filters.Ticket != "" {
        filteredRows, err = FilterByField(
          filteredRows, "Ticket", filters.Ticket)
      }
      if filters.Date.To != "" || filters.Date.From != "" {
        filteredRows, err = FilterByDataRange(
          filteredRows, "Date", filters.Date.From, filters.Date.To)
      }
    }

    // Pagination
    queryPagination := r.URL.Query().Get("paginationOff")
    if queryPagination == "true" {
		  SuccessResponse{Data: filteredRows}.r200(w, r)
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

func getOperationById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectOperations("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func getOperationsByItem(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}

		path := r.PathValue("id")
		rows, err := db.SelectOperations("Item_id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
		var filters OperationsFilters
    if queryFilters != "" {
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r400(w, r)
		  	return
		  }
      if filters.Search != "" {
        filteredRows, err = FilterBySearch(
          filteredRows, "Name", filters.Search)
      }
      if filters.User != "" {
        filteredRows, err = FilterByField(
          filteredRows, "User", filters.User)
      }
      if filters.Item != "" {
        filteredRows, err = FilterByField(
          filteredRows, "Item", filters.Item)
      }
      if filters.Variant != "" {
        filteredRows, err = FilterByField(
          filteredRows, "Variant", filters.Variant)
      }
      if filters.Ticket != "" {
        filteredRows, err = FilterByField(
          filteredRows, "Ticket", filters.Ticket)
      }
      if filters.Date.To != "" || filters.Date.From != "" {
        filteredRows, err = FilterByDataRange(
          filteredRows, "Date", filters.Date.From, filters.Date.To)
      }
    }

    // Pagination
    queryPagination := r.URL.Query().Get("paginationOff")
    if queryPagination == "true" {
		  SuccessResponse{Data: filteredRows}.r200(w, r)
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

func postOperation(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Operation
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r400(w, r)
			return
		}
		data.Id = uuid.NewString()
    data.Date = time.Now().Format(time.DateTime)
		err = db.Insert(data)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Message: "Row added"}.r201(w, r)
	}
}

func putOperation(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectOperations("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Operation
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

func deleteOperation(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectOperations("Id = ?", path)
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
