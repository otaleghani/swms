package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
)

type ItemsFilters struct {
  Search string `json:"search,omitempty"`
  IsArchived string `json:"isArchived,omitempty"`
  Zone string `json:"zone,omitempty"`
  Aisle string `json:"aisle,omitempty"`
  Rack string `json:"rack,omitempty"`
  Shelf string `json:"shelf,omitempty"`
  Category string `json:"category,omitempty"`
  Subcategory string `json:"subcategory,omitempty"`
}

func getItems(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectItems("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filters
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters ItemsFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.IsArchived != "" {
          filteredRows, err = FilterByBool(
            filteredRows, "IsArchived", filters.IsArchived)
        }
        if filters.Zone != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Zone", filters.Zone)
        }
        if filters.Aisle != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Aisle", filters.Aisle)
        }
        if filters.Rack != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Rack", filters.Rack)
        }
        if filters.Shelf != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Shelf", filters.Shelf)
        }
        if filters.Category != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Category", filters.Category)
        }
        if filters.Subcategory != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Subcategory", filters.Subcategory)
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

func getItemById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectItems("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func postItems(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Item
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

func putItem(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectItems("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Item
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

func deleteItem(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectItems("Id = ?", path)
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

// I could create a generic...
type ItemKeyFilter string;
const (
  Zone ItemKeyFilter = "Zone_id"
  Aisle ItemKeyFilter = "Aisle_id"
  Rack ItemKeyFilter = "Rack_id"
  Shelf ItemKeyFilter = "Shelf_id"
  Category ItemKeyFilter = "Category_id"
  Subcategory ItemKeyFilter = "Subcategory_id"
)

type ItemComplete struct {
  Item database.Item `json:"item"`
  Variants []database.Variant `json:"variants"`
  Images []database.Item_image `json:"images"`
  Category database.Category `json:"category"`
  Subcategory database.Subcategory `json:"subcategory"`
}

func getItemsByKeyWithExtra(db *database.Database, key ItemKeyFilter) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }

    path := r.PathValue("id")
    condition := string(key) + " = ?"
    rows, err := db.SelectItems(condition, path)
    //rows, err := db.SelectItems("Zone_id = ?", path)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
    }

    // Filters data
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters ItemsFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.IsArchived != "" {
          filteredRows, err = FilterByBool(
            filteredRows, "IsArchived", filters.IsArchived)
        }
        if filters.Zone != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Zone", filters.Zone)
        }
        if filters.Aisle != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Aisle", filters.Aisle)
        }
        if filters.Rack != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Rack", filters.Rack)
        }
        if filters.Shelf != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Shelf", filters.Shelf)
        }
        if filters.Category != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Category", filters.Category)
        }
        if filters.Subcategory != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Subcategory", filters.Subcategory)
        }
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    // paginationOff is not even checked because this would be called only
    // in paginated situations
    queryPage := r.URL.Query().Get("page")
    queryPerPage := r.URL.Query().Get("perPage")
    resultedItems, page, perPage, totalItems, totalPages, err := 
      paginateItems(queryPage, queryPerPage, filteredRows)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Here its creating itemComplete
    var data []ItemComplete
    for i := 0; i < len(resultedItems); i++ {
      variants, err := db.SelectVariants("Item_id = ?", resultedItems[i].Id)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }
      category, err := db.SelectCategoryById(resultedItems[i].Category_id)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }
      subcategory, err := db.SelectSubcategoryById(resultedItems[i].Subcategory_id)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }
      images, err := db.SelectItemImagesByItemId(resultedItems[i].Id)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }

      data = append(data, ItemComplete{
        Item: resultedItems[i],
        Variants: variants,
        Images: images,
        Category: category,
        Subcategory: subcategory,
      })
    }

		SuccessResponse{
      Data: data,
      Page: page,
      PerPage: perPage,
      TotalItems: totalItems,
      TotalPages: totalPages,
    }.r200(w, r)
  }
}

// This version returns just the items
func getItemsByKey(db *database.Database, key ItemKeyFilter) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }

    path := r.PathValue("id")
    condition := string(key) + " = ?"
    rows, err := db.SelectItems(condition, path)
    //rows, err := db.SelectItems("Zone_id = ?", path)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r500(w, r)
    }

    // Filters data
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters ItemsFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err == nil {
        if filters.IsArchived != "" {
          filteredRows, err = FilterByBool(
            filteredRows, "IsArchived", filters.IsArchived)
        }
        if filters.Zone != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Zone", filters.Zone)
        }
        if filters.Aisle != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Aisle", filters.Aisle)
        }
        if filters.Rack != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Rack", filters.Rack)
        }
        if filters.Shelf != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Shelf", filters.Shelf)
        }
        if filters.Category != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Category", filters.Category)
        }
        if filters.Subcategory != "" {
          filteredRows, err = FilterByField(
            filteredRows, "Subcategory", filters.Subcategory)
        }
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    // paginationOff is not even checked because this would be called only
    // in paginated situations
    queryPage := r.URL.Query().Get("page")
    queryPerPage := r.URL.Query().Get("perPage")
    resultedItems, page, perPage, totalItems, totalPages, err := 
      paginateItems(queryPage, queryPerPage, filteredRows)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Here its creating itemComplete
    var data []ItemComplete
    for i := 0; i < len(resultedItems); i++ {
      variants, err := db.SelectVariants("Item_id = ?", resultedItems[i].Id)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }
      category, err := db.SelectCategoryById(resultedItems[i].Category_id)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }
      subcategory, err := db.SelectSubcategoryById(resultedItems[i].Subcategory_id)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }
      images, err := db.SelectItemImagesByItemId(resultedItems[i].Id)
      if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
      }

      data = append(data, ItemComplete{
        Item: resultedItems[i],
        Variants: variants,
        Images: images,
        Category: category,
        Subcategory: subcategory,
      })
    }

		SuccessResponse{
      Data: data,
      Page: page,
      PerPage: perPage,
      TotalItems: totalItems,
      TotalPages: totalPages,
    }.r200(w, r)
  }
}
