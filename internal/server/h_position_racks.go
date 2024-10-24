package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
  "github.com/otaleghani/spg"
)

type RacksFilters struct {
  Search string `json:"search,omitempty"`
  Zone string `json:"zone,omitempty"`
  Aisle string `json:"aisle,omitempty"`
}

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

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
		var filters RacksFilters
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
    SuccessResponse{Message: "Row added", Data: UniqueId{UUID: data.Id}}.r201(w, r)
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

    // Filters
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := racks

		var filters RacksFilters
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
      if filters.Search != "" {
        filteredRows, err = FilterBySearch(
          filteredRows, "Name", filters.Search)
      }
    }

    // Data construction
    var data []struct {
      Rack database.Rack `json:"rack"`
      Shelfs_count int `json:"shelfs_count"`
      Items_count int `json:"items_count"`
    }
    for i := 0; i < len(filteredRows); i++ {
      shelfs, err := db.SelectShelfsByRack(filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      items, err := db.SelectItems("Rack_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Rack database.Rack `json:"rack"`
          Shelfs_count int `json:"shelfs_count"`
          Items_count int `json:"items_count"`
        }{
          Rack: filteredRows[i],
          Shelfs_count: len(shelfs),
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

func getRacksWithData(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		racks, err := db.SelectRacks("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filters
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := racks

		var filters RacksFilters
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
      if filters.Search != "" {
        filteredRows, err = FilterBySearch(
          filteredRows, "Name", filters.Search)
      }
    }

    // Data construction
    var data []struct {
      Rack database.Rack `json:"rack"`
      Shelfs_count int `json:"shelfs_count"`
      Items_count int `json:"items_count"`
    }
    for i := 0; i < len(filteredRows); i++ {
      shelfs, err := db.SelectShelfsByRack(filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      items, err := db.SelectItems("Rack_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Rack database.Rack `json:"rack"`
          Shelfs_count int `json:"shelfs_count"`
          Items_count int `json:"items_count"`
        }{
          Rack: filteredRows[i],
          Shelfs_count: len(shelfs),
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

func getRackByShelfId(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		path := r.PathValue("id")
		shelf, err := db.SelectShelfById(path)
		if err != nil {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    aisle, err := db.SelectRackById(shelf.Rack_id)
		if err != nil {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: aisle}.r200(w, r)
  }
}

func deleteRackSub(db *database.Database) http.HandlerFunc {
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
		itemToDelete, err := db.SelectRacks("Id = ?", path)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemToDelete) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    itemThatReplaces, err := db.SelectRacks("Id = ?", replacer)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemThatReplaces) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    var shelf database.Shelf = database.Shelf{
      Zone_id: itemThatReplaces[0].Zone_id, 
      Aisle_id: itemThatReplaces[0].Aisle_id,
      Rack_id: itemThatReplaces[0].Id,
    }
    err = db.Update(shelf, "Rack_id = ?", itemToDelete[0].Id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    var item database.Item = database.Item{
      Zone_id: itemThatReplaces[0].Zone_id, 
      Aisle_id: itemThatReplaces[0].Aisle_id,
      Rack_id: itemThatReplaces[0].Id,
    }
    err = db.Update(item, "Rack_id = ?", itemToDelete[0].Id)
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
