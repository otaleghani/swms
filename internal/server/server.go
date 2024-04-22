package server

import(
  "net/http"
  "log"
  "github.com/otaleghani/swms/internal/database"
)

func ServerStart(path string) {
  db, err := database.CreateDatabase(path)

  if err != nil {
    log.Fatal(err)
  }

  const defaultPort = "8080"
  mux := http.NewServeMux()

  mux.HandleFunc("/add", handleAdd(db))
  mux.HandleFunc("/get", handleGet(db))

  corsMux := middlewareCors(mux)
  srv := &http.Server{
    Addr: ":" + defaultPort,
    Handler: corsMux,
  }

  log.Printf("Serving on port: %s\n", defaultPort)
  log.Fatal(srv.ListenAndServe())
}
