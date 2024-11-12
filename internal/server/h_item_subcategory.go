package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

type SubcategoriesFilter struct {
  Search string `json:"search,omitempty"`
  Category string `json:"category,omitempty"`
}

func getSubcategories(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectSubcategories("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filters
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters SubcategoriesFilter
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.Category != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Category", filters.Category)
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

func getSubcategoriesWithExtra(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		rows, err := db.SelectSubcategories("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters SubcategoriesFilter
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.Category != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Category", filters.Category)
        }
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    // Construct data
    var data []struct {
      Subcategory database.Subcategory `json:"subcategory"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(filteredRows); i++ {
      items, err := db.SelectItems("Subcategory_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Subcategory database.Subcategory `json:"subcategory"`
          Items_count int `json:"itemsCount"`
        }{
          Subcategory: filteredRows[i],
          Items_count: len(items),
        },
      )
    }

    // Pagination
    queryPagination := r.URL.Query().Get("paginationOff")
    if queryPagination == "true" {
		  SuccessResponse{Data: data}.r200(w, r)
      return
    }

    queryPage := r.URL.Query().Get("page")
    queryPerPage := r.URL.Query().Get("perPage")

    resultedItems, page, perPage, totalItems, totalPages, err := paginateItems(queryPage, queryPerPage, data)

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

func getSubcategoriesWithExtraByCategory(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }

		path := r.PathValue("id")

		rows, err := db.SelectSubcategories("Category_id = ?", path)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters SubcategoriesFilter
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.Category != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Category", filters.Category)
        }
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    // Construct data
    var data []struct {
      Subcategory database.Subcategory `json:"subcategory"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(filteredRows); i++ {
      items, err := db.SelectItems("Subcategory_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Subcategory database.Subcategory `json:"subcategory"`
          Items_count int `json:"itemsCount"`
        }{
          Subcategory: filteredRows[i],
          Items_count: len(items),
        },
      )
    }

    // Pagination
    queryPagination := r.URL.Query().Get("paginationOff")
    if queryPagination == "true" {
		  SuccessResponse{Data: data}.r200(w, r)
      return
    }

    queryPage := r.URL.Query().Get("page")
    queryPerPage := r.URL.Query().Get("perPage")

    resultedItems, page, perPage, totalItems, totalPages, err := paginateItems(queryPage, queryPerPage, data)

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

func getSubcategoryById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectSubcategories("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func getSubcategoryWithExtraById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectSubcategories("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    filteredRows := rows

    var data []struct {
      Subcategory database.Subcategory `json:"subcategory"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(filteredRows); i++ {
      items, err := db.SelectItems("Subcategory_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Subcategory database.Subcategory `json:"subcategory"`
          Items_count int `json:"itemsCount"`
        }{
          Subcategory: filteredRows[i],
          Items_count: len(items),
        },
      )
    }

		SuccessResponse{Data: data[0]}.r200(w, r)
	}
}

func getSubcategoriesByCategory(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
    path := r.PathValue("id")
    rows, err := db.SelectSubcategories("Category_id = ?", path)
    if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
    }

    // Filters
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters SubcategoriesFilter
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.Category != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Category", filters.Category)
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

func postSubcategories(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Subcategory
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

func putSubcategory(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectSubcategories("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Subcategory
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

    var item database.Item = database.Item{
      Category_id: data.Category_id,
      Subcategory_id: data.Id,
    }
    err = db.Update(item, "Subcategory_id = ?", data.Id)
		if err != nil {
			ErrorResponse{
        Message: "Subcategory cascade update for items failed: " + err.Error(),
      }.r500(w, r)
			return
    }

		SuccessResponse{Message: "Row updated"}.r200(w, r)
	}
}

func deleteSubcategory(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectSubcategories("Id = ?", path)
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

func deleteSubcategorySub(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		replacer := r.PathValue("rep")
    if path == replacer {
      ErrorResponse{Message: "Cannot delete the same item."}.r500(w, r)
      return
    }
		itemToDelete, err := db.SelectSubcategories("Id = ?", path)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemToDelete) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    itemThatReplaces, err := db.SelectSubcategories("Id = ?", replacer)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemThatReplaces) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    var item database.Item = database.Item{
      Subcategory_id: itemThatReplaces[0].Id,
    }
    err = db.Update(item, "Subcategory_id = ?", itemToDelete[0].Id)
    if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
    }

		err = db.Delete(itemToDelete[0], "Id = ?", path)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		SuccessResponse{Message: "Row deleted"}.r200(w, r)
  }
}
