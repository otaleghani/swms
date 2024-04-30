/*********************************************************************

We need to connect this with the other part of the application.

1. Create media folder where all of the media is stored

localhost:8000/qr/xxx.png
-> This can be an example of url

*********************************************************************/
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
  mux.HandleFunc("/media/*", http.FileServer(http.Dir("media")))
  mux.HandleFunc("/get", handleGet(db))

  corsMux := middlewareCors(mux)
  srv := &http.Server{
    Addr: ":" + defaultPort,
    Handler: corsMux,
  }

  log.Printf("Serving on port: %s\n", defaultPort)
  log.Fatal(srv.ListenAndServe())
}
