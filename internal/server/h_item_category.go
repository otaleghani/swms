package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

type CategoriesFilters struct {
  Search string `json:"search,omitempty"`
}

func getCategories(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectCategories("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filters
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := deleteNilValue(rows)
    if queryFilters != "" {
		  var filters CategoriesFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    // Pagination
    queryPaginationOff := r.URL.Query().Get("paginationOff")
    if queryPaginationOff == "true" {
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

func getCategoryWithExtraById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectCategories("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    filteredRows := rows

    var data []struct {
      Category database.Category `json:"category"`
      Subcategories_count int `json:"subcategoriesCount"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(filteredRows); i++ {
      subcategories, err := db.SelectSubcategories("Category_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      items, err := db.SelectItems("Category_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Category database.Category `json:"category"`
          Subcategories_count int `json:"subcategoriesCount"`
          Items_count int `json:"itemsCount"`
        }{
          Category: filteredRows[i],
          Subcategories_count: len(subcategories),
          Items_count: len(items),
        },
      )
    }

    // construct the data
		SuccessResponse{Data: data[0]}.r200(w, r)
	}
}

func getCategoryById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectCategories("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    filteredRows := rows

    // Construct data
    var data []struct {
      Category database.Category `json:"category"`
      Subcategories_count int `json:"subcategoriesCount"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(filteredRows); i++ {
      subcategories, err := db.SelectSubcategories("Category_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      items, err := db.SelectItems("Aisle_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Category database.Category `json:"category"`
          Subcategories_count int `json:"subcategoriesCount"`
          Items_count int `json:"itemsCount"`
        }{
          Category: filteredRows[i],
          Subcategories_count: len(subcategories),
          Items_count: len(items),
        },
      )
    }

		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func getCategoriesWithExtra(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		rows, err := db.SelectCategories("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := deleteNilValue(rows)

    if queryFilters != "" {
		  var filters CategoriesFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    // Construct data
    var data []struct {
      Category database.Category `json:"category"`
      Subcategories_count int `json:"subcategoriesCount"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(filteredRows); i++ {
      subcategories, err := db.SelectSubcategories("Category_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      items, err := db.SelectItems("Category_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Category database.Category `json:"category"`
          Subcategories_count int `json:"subcategoriesCount"`
          Items_count int `json:"itemsCount"`
        }{
          Category: filteredRows[i],
          Subcategories_count: len(subcategories),
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

func postCategories(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Category
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

func putCategory(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectCategories("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Category
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
      Category_id: data.Id,
    }
    err = db.Update(item, "Category_id = ?", data.Id)
		if err != nil {
			ErrorResponse{
        Message: "Category cascade update for items failed: " + err.Error(),
      }.r500(w, r)
			return
    }

    var subcategory database.Subcategory = database.Subcategory{
      Category_id: data.Id,
    }
    err = db.Update(subcategory, "Category_id = ?", data.Id)
		if err != nil {
			ErrorResponse{
        Message: "Category cascade update for subcateories failed: " + err.Error(),
      }.r500(w, r)
			return
    }

		SuccessResponse{Message: "Row updated"}.r200(w, r)
	}
}

func deleteCategory(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectCategories("Id = ?", path)
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

func deleteCategorySub(db *database.Database) http.HandlerFunc {
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
		itemToDelete, err := db.SelectCategories("Id = ?", path)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemToDelete) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    itemThatReplaces, err := db.SelectCategories("Id = ?", replacer)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemThatReplaces) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    var subcategory database.Subcategory = database.Subcategory{
      Category_id: itemThatReplaces[0].Id,
    }
    err = db.Update(subcategory, "Category_id = ?", itemToDelete[0].Id)
    if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
    }
    var item database.Item = database.Item{
      Category_id: itemThatReplaces[0].Id,
    }
    err = db.Update(item, "Category_id = ?", itemToDelete[0].Id)
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

func getCategoryBySubcategory(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
    subcategory, err := db.SelectSubcategoryById(path)
    if err != nil {
			ErrorResponse{Message: "Not found"}.r500(w, r)
			return
    }
    category, err := db.SelectCategoryById(subcategory.Category_id)
    if err != nil {
			ErrorResponse{Message: "Not found"}.r500(w, r)
			return
    }
    SuccessResponse{Data: category}.r200(w, r)
  }
}
