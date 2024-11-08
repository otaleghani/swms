package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
  "github.com/otaleghani/spg"
)

type ShelfsFilters struct {
  Search string `json:"search,omitempty"`
  Zone string `json:"zone,omitempty"`
  Aisle string `json:"aisle,omitempty"`
  Rack string `json:"rack,omitempty"`
}

func getShelfs(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectShelfs("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
		var filters ShelfsFilters
    if queryFilters != "" {
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r400(w, r)
		  	return
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
      if filters.Search != "" {
        filteredRows, err = FilterBySearch(
          filteredRows, "Name", filters.Search)
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

func getShelfById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectShelfs("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func getShelfWithExtraById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectShelfs("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    var data []struct {
      Shelf database.Shelf `json:"shelf"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(rows); i++ {
      items, err := db.SelectItems("Shelf_id = ?", rows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Shelf database.Shelf `json:"shelf"`
          Items_count int `json:"itemsCount"`
        }{
          Shelf: rows[i],
          Items_count: len(items),
        },
      )
    }
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func postShelfs(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Shelf
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

func putShelf(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectShelfs("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Shelf
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

func deleteShelf(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectShelfs("Id = ?", path)
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

func getShelfsByRackWithExtra(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		path := r.PathValue("id")
    shelfs, err := db.SelectShelfsByRack(path)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := shelfs
		var filters ShelfsFilters
    if queryFilters != "" {
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r400(w, r)
		  	return
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
      if filters.Search != "" {
        filteredRows, err = FilterBySearch(
          filteredRows, "Name", filters.Search)
      }
    }

    var data []struct {
      Shelf database.Shelf `json:"shelf"`
      Items_count int `json:"items_count"`
    }
    for i := 0; i < len(shelfs); i++ {
      items, err := db.SelectItems("Shelf_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Shelf database.Shelf `json:"shelf"`
          Items_count int `json:"items_count"`
        }{
          Shelf: filteredRows[i],
          Items_count: len(items),
        },
      )
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

type BodyRequestBulkPostShelfs struct {
  Number int `json:"quantity"`
  Zone_id string `json:"zone"`
  Aisle_id string `json:"aisle"`
  Rack_id string `json:"rack"`
}

func postBulkShelfs(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
    var data BodyRequestBulkPostShelfs
    err := json.NewDecoder(r.Body).Decode(&data)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r400(w, r)
      return
    }
    g := spg.New("en-usa")
    var opt = spg.Options{Format: "camel", Separator: "-"}
    var shelf database.Shelf
    for i := 0; i < data.Number; i++ {
		  shelf.Id = uuid.NewString()
      shelf.Name = g.Place().Street(opt)
      shelf.Zone_id = data.Zone_id
      shelf.Aisle_id = data.Aisle_id
      shelf.Rack_id = data.Rack_id

		  err = db.Insert(shelf)
      if err != nil {
        ErrorResponse{Message: err.Error()}.r500(w, r)
        return
      }
    }
		SuccessResponse{Message: "Rows added"}.r201(w, r)
  }
}

func getShelfsWithExtra(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		shelfs, err := db.SelectShelfs("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := shelfs
		var filters ShelfsFilters
    if queryFilters != "" {
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r400(w, r)
		  	return
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
      if filters.Search != "" {
        filteredRows, err = FilterBySearch(
          filteredRows, "Name", filters.Search)
      }
    }

    var data []struct {
      Shelf database.Shelf `json:"shelf"`
      Items_count int `json:"items_count"`
    }
    for i := 0; i < len(shelfs); i++ {
      items, err := db.SelectItems("Shelf_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Shelf database.Shelf `json:"shelf"`
          Items_count int `json:"items_count"`
        }{
          Shelf: filteredRows[i],
          Items_count: len(items),
        },
      )
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

func deleteShelfSub(db *database.Database) http.HandlerFunc {
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
		itemToDelete, err := db.SelectShelfs("Id = ?", path)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemToDelete) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    itemThatReplaces, err := db.SelectShelfs("Id = ?", replacer)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemThatReplaces) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    var item database.Item = database.Item{
      Zone_id: itemThatReplaces[0].Zone_id, 
      Aisle_id: itemThatReplaces[0].Aisle_id,
      Rack_id: itemThatReplaces[0].Rack_id,
      Shelf_id: itemThatReplaces[0].Id,
    }
    err = db.Update(item, "Shelf_id = ?", itemToDelete[0].Id)
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
