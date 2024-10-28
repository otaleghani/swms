package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/otaleghani/swms/internal/database"
  "github.com/otaleghani/spg"
)

type ZonesFilters struct {
  Search string `json:"search,omitempty"`
}

func getZones(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		rows, err := db.SelectZones("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}

    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := rows
    if queryFilters != "" {
		  var filters ZonesFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
      // If the filters are valid, filter the content, else skip.
		  if err == nil {
        // Checks if every field is not an empty string and filters.
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

func getZoneById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, _ := db.SelectZones("Id = ?", path)
if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: rows[0]}.r200(w, r)
	}
}

func getZoneByIdWithData(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		path := r.PathValue("id")
		zone, err := db.SelectZones("Id = ?", path)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    var data struct {
      Zone database.Zone `json:"zone"`
      Aisle_count int `json:"aislesCount"`
      Items_count int `json:"itemsCount"`
    }
    aisles, err := db.SelectAislesByZone(zone[0].Id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    items, err := db.SelectItems("Zone_id = ?", zone[0].Id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    data = struct{
      Zone database.Zone `json:"zone"`
      Aisle_count int `json:"aislesCount"`
      Items_count int `json:"itemsCount"`
    }{
      Zone: zone[0],
      Aisle_count: len(aisles),
      Items_count: len(items),
    }
    
		SuccessResponse{Data: data}.r200(w, r)
  }
}

func postZones(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		var data database.Zone
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

func putZone(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		id := r.PathValue("id")
		rows, err := db.SelectZones("Id = ?", id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
		if len(rows) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		var data database.Zone
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

func deleteZone(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if err := checkAccessToken(token, db); err != nil {
			ErrorResponse{Message: err.Error()}.r401(w, r)
			return
		}
		path := r.PathValue("id")
		rows, err := db.SelectZones("Id = ?", path)
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

// export a type for this creating
type BodyRequestBulkPostZones struct {
  Number int `json:"quantity"`
}

func postBulkZones(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
    var data BodyRequestBulkPostZones
    err := json.NewDecoder(r.Body).Decode(&data)
    if err != nil {
      ErrorResponse{Message: err.Error()}.r400(w, r)
      return
    }
    g := spg.New("en-usa")
    var opt = spg.Options{Format: "camel", Separator: "-"}
    var zone database.Zone
    var returnData []string
    for i := 0; i < data.Number; i++ {
		  zone.Id = uuid.NewString()
      returnData = append(returnData, zone.Id)
      zone.Name = g.Place().Country(opt)
		  err = db.Insert(zone)
      if err != nil {
        ErrorResponse{Message: err.Error()}.r500(w, r)
        return
      }
    }
    SuccessResponse{Message: "Rows added", Data: returnData}.r201(w, r)
  }
}

func getZonesWithData(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		zones, err := db.SelectZones("")
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    // Filter
    queryFilters := r.URL.Query().Get("filters")
    filteredRows := zones

    if queryFilters != "" {
		  var filters ZonesFilters
		  err = json.Unmarshal([]byte(queryFilters), &filters)
      // If the filters are valid, filter the content, else skip.
		  if err == nil {
        // Checks if every field is not an empty string and filters.
        if filters.Search != "" {
          filteredRows, err = FilterBySearch(
            filteredRows, "Name", filters.Search)
        }
		  }
    }

    // Construct zones with extra
    var data []struct {
      Zone database.Zone `json:"zone"`
      Aisle_count int `json:"aislesCount"`
      Items_count int `json:"itemsCount"`
    }
    for i := 0; i < len(filteredRows); i++ {
      aisles, err := db.SelectAislesByZone(filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      items, err := db.SelectItems("Zone_id = ?", filteredRows[i].Id)
		  if err != nil {
		  	ErrorResponse{Message: err.Error()}.r500(w, r)
		  	return
		  }
      data = append(data, struct{
          Zone database.Zone `json:"zone"`
          Aisle_count int `json:"aislesCount"`
          Items_count int `json:"itemsCount"`
        }{
          Zone: filteredRows[i],
          Aisle_count: len(aisles),
          Items_count: len(items),
        },
      )
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

func getZoneByAisleId(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
    token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
    if err := checkAccessToken(token, db); err != nil {
      ErrorResponse{Message: err.Error()}.r401(w, r)
      return
    }
		path := r.PathValue("id")
		aisle, err := db.SelectAisleById(path)
		if err != nil {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    zone, err := db.SelectZoneById(aisle.Zone_id)
		if err != nil {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: zone}.r200(w, r)
  }
}

func getZoneByRackId(db *database.Database) http.HandlerFunc {
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
    zone, err := db.SelectZoneById(rack.Zone_id)
		if err != nil {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: zone}.r200(w, r)
  }
}

func getZoneByShelfId(db *database.Database) http.HandlerFunc {
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
    zone, err := db.SelectZoneById(shelf.Zone_id)
		if err != nil {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
		SuccessResponse{Data: zone}.r200(w, r)
  }
}

func deleteZoneSub(db *database.Database) http.HandlerFunc {
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
		itemToDelete, err := db.SelectZones("Id = ?", path)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemToDelete) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}
    itemThatReplaces, err := db.SelectZones("Id = ?", replacer)
		if err != nil {
			ErrorResponse{Message: "Error fetching data from db"}.r500(w, r)
			return
		}
		if len(itemThatReplaces) == 0 {
			ErrorResponse{Message: "Not found"}.r404(w, r)
			return
		}

    var aisle database.Aisle = database.Aisle{Zone_id: itemThatReplaces[0].Id}
    err = db.Update(aisle, "Zone_id = ?", itemToDelete[0].Id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
    }
    var rack database.Rack = database.Rack{Zone_id: itemThatReplaces[0].Id}
    err = db.Update(rack, "Zone_id = ?", itemToDelete[0].Id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    var shelf database.Shelf = database.Shelf{Zone_id: itemThatReplaces[0].Id}
    err = db.Update(shelf, "Zone_id = ?", itemToDelete[0].Id)
		if err != nil {
			ErrorResponse{Message: err.Error()}.r500(w, r)
			return
		}
    var item database.Item = database.Item{Zone_id: itemThatReplaces[0].Id}
    err = db.Update(item, "Zone_id = ?", itemToDelete[0].Id)
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
