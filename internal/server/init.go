package server

import (
  "encoding/json"
  "net/http"
  "log"
  "time"

  "github.com/otaleghani/swms/internal/database"
)

func Serve(path, port string) {
  // opens db
  dbConn, err := database.Init(path)
  if err != nil {
    log.Println("ERROR: ", err)
    return
  }

  mux := http.NewServeMux()

  mux.HandleFunc("GET /api/v1/items", handleTest)
  mux.HandleFunc("GET /api/v1/items/{id}", handleTest2(&dbConn))

  corsMux := middlewareCors(mux)
  srv := &http.Server {
    Addr: ":" + port,
    Handler: corsMux,
    ReadTimeout: time.Second * 5,
    ReadHeaderTimeout: time.Second * 5,
    WriteTimeout: time.Second * 5,
    IdleTimeout: time.Second * 5,
  }
  log.Printf("Serving on port: %s\n", port)
  log.Fatal(srv.ListenAndServe())
}

func handleTest(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  w.Write([]byte("sandro"))
}

func handleTest2(db *database.Database) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    // params := r.URL.Query()
    // expand := params.Get("expand")
    // log.Println(expand)

    path := r.PathValue("id")
    log.Println(path)

    itemArray, _ := db.SelectItem("Id = ?", path)
    log.Println(itemArray)

    item := itemArray[0]

    type PositionResp struct {
      Id string `json="id"` 
    }
    type CategoryResp struct {
      Id string `json="id"` 
    }
    type SubcategoryResp struct {
      Id string `json="id"` 
    }
    type ItemResp struct {
      Id string `json="id"`
      Name string `json="name"`
      Description string `json="description"`
      Archive bool `json="archive"`
      Position PositionResp `json="position"` 
      Category CategoryResp `json="category"` 
      Subcategory SubcategoryResp `json="subcategory"` 
    }
    
    resp := ItemResp{
      Id: item.Id,
      Name: item.Name,
      Description: item.Description,
      Archive: item.Archive,
      Position: PositionResp{
        Id: item.Position_id,
      },
      Category: CategoryResp{
        Id: item.Category_id,
      },
      Subcategory: SubcategoryResp{
        Id: item.Subcategory_id,
      },
    }

    encodedResp, err := json.Marshal(resp)
    if err != nil {
      w.WriteHeader(404)
    }

    w.WriteHeader(200)
    w.Header().Set("Content-Type", "application/json")
    w.Write(encodedResp)
  }
}
