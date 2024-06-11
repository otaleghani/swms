package server

import (
  "fmt"
  "net/http"
  "encoding/json"

	"github.com/otaleghani/swms/internal/database"
)

func getUserById(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    rows, _ := db.SelectUser("Id = ?", id)
    if len(rows) == 0 {
      http.Error(w, fmt.Sprintf("404:  Not found"), 404)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 404)
			return
    }

    encodedResp, err := json.Marshal(rows[0])
    if err != nil {
      http.Error(w, fmt.Sprintf("500: %v", err), 500)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 500)
			return
    }

    w.Header().Set("Content-Type", "application/json")
		w.Write(encodedResp)
		w.WriteHeader(200)
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
  }
}

func getUsers(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    itemsArray, _ := db.SelectUser("")

    resp := []database.User{}
    for _, item := range itemsArray {
      resp = append(resp, database.User{
        Id: item.Id,
        Name: item.Name,
        Surname: item.Surname,
        Email: item.Email,
        Password: item.Password,
      })
    }

    encodedResp, err := json.Marshal(resp)
    if err != nil {
      w.WriteHeader(403)
      return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(encodedResp)
    w.WriteHeader(200)
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
  }
}

func postUsers(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
	  var data database.User
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
      http.Error(w, fmt.Sprintf("error: %v", err), http.StatusBadRequest)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, http.StatusBadRequest)
			return
		}

    rows, _ := db.SelectUser("Email = ?", data.Email)
    if len(rows) != 0 {
      http.Error(w, fmt.Sprintf("404:  Not found"), 404)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 404)
			return
    }
    // Check if user already exist
    err = db.InsertUser(data)
    if err != nil {
			http.Error(w, fmt.Sprintf("error: %v", err), http.StatusBadRequest)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, http.StatusBadRequest)
			return
    }

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(201)
		w.Write([]byte("Item added"))
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
  }
}

func deleteUser(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		itemArray, _ := db.SelectUser("Id = ?", id)
		if len(itemArray) == 0 {
      http.Error(w, "404 - Not found", 404)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 404)
			return
		}

    err := db.Delete(itemArray[0], "Id = ?", id)
    if err != nil {
			http.Error(w, "403 - Error deleting item. Try again.", 403)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 404)
      return
    }

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(201)
		w.Write([]byte("User deleted"))
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
  }
}

func putUser(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    rows, _ := db.SelectUser("Id = ?", id)
		if len(rows) == 0 {
      http.Error(w, "404: Not found", 404)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 404)
			return
		}

	  var data database.User
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
      http.Error(w, fmt.Sprintf("400: %v", err), 400)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 400)
			return
		}

    err = db.Update(data, "Id = ?", id)
    if err != nil {
      http.Error(w, fmt.Sprintf("500: %v", err), 500)
      logRequest(r.Method, r.URL.Path, r.RemoteAddr, 500)
			return
    }

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		w.Write([]byte("User updated"))
    logRequest(r.Method, r.URL.Path, r.RemoteAddr, 200)
  }
}
