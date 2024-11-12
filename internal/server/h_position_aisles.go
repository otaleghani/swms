package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
  "github.com/otaleghani/spg"
)

type AislesFilters struct {
  Search string `json:"search,omitempty"`
  Zone string `json:"zone,omitempty"`
}

func getAisles(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectAisles("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filters
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := deleteNilValue(rows)

		var filters AislesFilters
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

func getAisleById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectAisles("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func getAisleWithExtraById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectAisles("Id = ?", path)
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    var data []struct {
      Aisle database.Aisle `json:"aisle"`
      Racks_count int `json:"racksCount"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(rows); i++ {
      racks, err := db.SelectRacksByAisle(rows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      items, err := db.SelectItems("Aisle_id = ?", rows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Aisle database.Aisle `json:"aisle"`
          Racks_count int `json:"racksCount"`
          Items_count int `json:"itemsCount"`
        }{
          Aisle: rows[i],
          Racks_count: len(racks),
          Items_count: len(items),
        },
      )
    }


		SuccessResponse{Data: data[0]}.r200(w, r)
	}
}

func postAisles(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Aisle
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

func putAisle(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectAisles("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Aisle
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

    // Here we need to update the foreign keys of every other item
    // that has them. 
    var rack database.Rack = database.Rack{
      Zone_id: data.Zone_id,
      Aisle_id: data.Id,
    }
    err = db.Update(rack, "Aisle_id = ?", data.Id)
		if err != nil {
      ErrorResponse{
        Message: "Aisle cascade update for racks failed: " + err.Error(),
      }.r500(w, r)
			return
    }

    var shelf database.Shelf = database.Shelf{
      Zone_id: data.Zone_id,
      Aisle_id: data.Id,
    }
    err = db.Update(shelf, "Aisle_id = ?", data.Id)
		if err != nil {
      ErrorResponse{
        Message: "Aisle cascade update for shelfs failed: " + err.Error(),
      }.r500(w, r)
			return
    }

    var item database.Item = database.Item{
      Zone_id: data.Zone_id,
      Aisle_id: data.Id,
    }
    err = db.Update(item, "Aisle_id = ?", data.Id)
		if err != nil {
      ErrorResponse{
        Message: "Aisle cascade update for items failed: " + err.Error(),
      }.r500(w, r)
			return
    }

		SuccessResponse{Message: "Row updated"}.r200(w, r)
	}
}

func deleteAisle(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectAisles("Id = ?", path)
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

func getAislesByZone(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
    list, err := db.SelectAislesByZone(path)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filters
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := list

    if queryFilters != "" {
		  var filters AislesFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
      // If the filters are valid, filter the content, else skip.
		  if err == nil {
        // Checks if every field is not an empty string and filters.
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
        // In this case you don't want to filter per zones,
        // because you already did it to begin with.
        // if filters.Zone != "" {
        //   filteredRows, err = FilterBySearch(
        //     filteredRows, "Name", filters.Search)
        // }
		  }
    }

    // Pagination
    queryPaginationOff := r.URL.Query().Get("paginationOff")
    if queryPaginationOff == "true" {
      // if paginationOff is set to "true", returns the data
      // without pagination
		  SuccessResponse{Data: list}.r200(w, r)
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

type BodyRequestBulkPostAisles struct {
  Number int `json:"quantity"`
  Zone_id string `json:"zone"`
}

func postBulkAisles(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
    var data BodyRequestBulkPostAisles
    err := json.NewDecoder(r.Body).Decode(&data)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r400(w, r)
      return
    }
    g := spg.New("en-usa")
    var opt = spg.Options{Format: "camel", Separator: "-"}
    var aisle database.Aisle
    for i := 0; i < data.Number; i++ {
		  aisle.Id = uuid.NewString()
      aisle.Name = g.Place().State(opt)
      aisle.Zone_id = data.Zone_id
		  err = db.Insert(aisle)
      if err != nil {
        ErrorResponse{Message: err.Error()}.r500(w, r)
        return
      }
    }
		SuccessResponse{Message: "Rows added"}.r201(w, r)
  }
}

func getAislesWithExtra(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		aisles, err := db.SelectAisles("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := deleteNilValue(aisles)

    if queryFilters != "" {
		  var filters AislesFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r400(w, r)
		  	return
		  }
      if filters.Zone != "" {
        filteredRows, err = FilterByField(
          filteredRows, "Zone_id", filters.Zone)
      } 

      if filters.Search != "" {
        filteredRows, err = FilterBySearch(
          filteredRows, "Name", filters.Search)
      } 
    }

    // Construct data
    var data []struct {
      Aisle database.Aisle `json:"aisle"`
      Racks_count int `json:"racksCount"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(filteredRows); i++ {
      racks, err := db.SelectRacksByAisle(filteredRows[i].Id)
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
          Aisle database.Aisle `json:"aisle"`
          Racks_count int `json:"racksCount"`
          Items_count int `json:"itemsCount"`
        }{
          Aisle: filteredRows[i],
          Racks_count: len(racks),
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

func getAislesByZoneWithExtra(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		path := r.PathValue("id")
    aisles, err := db.SelectAislesByZone(path)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := aisles

    if queryFilters != "" {
		  var filters AislesFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r400(w, r)
		  	return
		  }
      if filters.Zone != "" {
        filteredRows, err = FilterByField(
          filteredRows, "Zone_id", filters.Zone)
      } 

      if filters.Search != "" {
        filteredRows, err = FilterBySearch(
          filteredRows, "Name", filters.Search)
      } 
    }

    var data []struct {
      Aisle database.Aisle `json:"aisle"`
      Racks_count int `json:"racksCount"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(filteredRows); i++ {
      racks, err := db.SelectRacksByAisle(filteredRows[i].Id)
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
          Aisle database.Aisle `json:"aisle"`
          Racks_count int `json:"racksCount"`
          Items_count int `json:"itemsCount"`
        }{
          Aisle: filteredRows[i],
          Racks_count: len(racks),
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

func getAisleByRackId(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		path := r.PathValue("id")
		rack, err := db.SelectRackById(path)
		if err != nil {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    aisle, err := db.SelectAisleById(rack.Aisle_id)
		if err != nil {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: aisle}.r200(w, r)
  }
}

func getAisleByShelfId(db *database.Database) http.HandlerFunc {
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
    aisle, err := db.SelectAisleById(shelf.Aisle_id)
		if err != nil {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: aisle}.r200(w, r)
  }
}

func deleteAisleSub(db *database.Database) http.HandlerFunc {
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
		itemToDelete, err := db.SelectAisles("Id = ?", path)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemToDelete) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    itemThatReplaces, err := db.SelectAisles("Id = ?", replacer)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemThatReplaces) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    var rack database.Rack = database.Rack{
      Zone_id: itemThatReplaces[0].Zone_id, 
      Aisle_id: itemThatReplaces[0].Id,
    }
    err = db.Update(rack, "Aisle_id = ?", itemToDelete[0].Id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    var shelf database.Shelf = database.Shelf{
      Zone_id: itemThatReplaces[0].Zone_id, 
      Aisle_id: itemThatReplaces[0].Id,
    }
    err = db.Update(shelf, "Aisle_id = ?", itemToDelete[0].Id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    var item database.Item = database.Item{
      Zone_id: itemThatReplaces[0].Zone_id, 
      Aisle_id: itemThatReplaces[0].Id,
    }
    err = db.Update(item, "Aisle_id = ?", itemToDelete[0].Id)
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
