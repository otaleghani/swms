package server

import (
  "fmt"
	"encoding/json"
	"net/http"

	"github.com/otaleghani/swms/internal/database"
)

func deleteItem(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		path := r.PathValue("id")
		itemArray, _ := db.SelectItem("Id = ?", path)
		if len(itemArray) == 0 {
      http.Error(w, "404 - Not found", 404)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 404)
			return
		}

    err := db.Delete(itemArray[0], "Id = ?", path)
    if err != nil {
			http.Error(w, "403 - Error deleting item. Try again.", 403)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 404)
      return
    }

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(201)
		w.Write([]byte("Item deleted"))
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
  }
}

func postItems(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
	  var data database.Item
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
      status := http.StatusBadRequest
      http.Error(w, fmt.Sprintf("%v: %v", status, err), status)
      logRequest(r.Method,r.URL.Path, r.RemoteAddr, status)
			return
		}

    err = db.Insert(data)
    if err != nil {
      status := http.StatusBadRequest
      http.Error(w, fmt.Sprintf("%v: %v", status, err), status)
      logRequest(r.Method,r.URL.Path, r.RemoteAddr, status)
			return
    }

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(201)
		w.Write([]byte("Item added"))
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
  }
}

func getItems(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		itemArray, err := db.SelectItem("")
    if err != nil {
      status := http.StatusBadRequest
      http.Error(w, fmt.Sprintf("%v: %v", status, err), status)
      logRequest(r.Method,r.URL.Path, r.RemoteAddr, status)
			return
    }

    // resp := []database.Item{}
    // for _, item := range itemArray {
		//   resp = append(resp, database.Item{
		//   	Id:          item.Id,
		//   	Name:        item.Name,
		//   	Description: item.Description,
		//   	Archive:     item.Archive,
		//   	Position_id: item.Position_id,
		//   	Category_id: item.Category_id,
		//   	Subcategory_id: item.Subcategory_id,
		//   })
    // }

		encodedResp, err := json.Marshal(itemArray)
		if err != nil {
			w.WriteHeader(404)
		}

    w.Header().Set("Content-Type", "application/json")
		w.Write(encodedResp)
		w.WriteHeader(200)
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
  }
}

func getItemById(db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		path := r.PathValue("id")
		itemArray, _ := db.SelectItem("Id = ?", path)
		if len(itemArray) == 0 {
			w.WriteHeader(404)
			w.Write([]byte("404 page not found"))
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 404)
			return
		}

		item := itemArray[0]
		// resp := database.Item{
		// 	Id:          item.Id,
		// 	Name:        item.Name,
		// 	Description: item.Description,
		// 	Archive:     item.Archive,
		// 	Position_id: item.Position_id,
		// 	Category_id: item.Category_id,
		// 	Subcategory_id: item.Subcategory_id,
		// }

		encodedResp, err := json.Marshal(item)
		if err != nil {
			w.WriteHeader(404)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		w.Write(encodedResp)
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
	}
}
