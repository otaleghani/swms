package server

import(
  "net/http"
  "encoding/json"
  "log"
  "fmt"
)

// Here I have to take into consideration the
// mux policies
// So like how do I 
// wait.. no I do have to handle the mux only
// on the db side of things

func middlewareCors(next http.Handler) http.Handler {
  return http.HandlerFunc(func (w http.ResponseWriter, r * http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    w.Header().Set("Access-Control-Allow-Headers", "*")
    next.ServeHTTP(w, r)
  })

}

func Handler() {
  // Create a new DB
  const defaultPort = "8080"
  mux := http.NewServeMux()

  mux.HandleFunc("/some/thing", handleSomething)

  corsMux := middlewareCors(mux)
  srv := &http.Server{
    Addr: ":" + defaultPort,
    Handler: corsMux,
  }

  log.Printf("Serving on port: %s\n", defaultPort)
  log.Fatal(srv.ListenAndServe())
}

type some struct {
  Name string `json:"name"`
  Age int `json:"age"`
}

func handleSomething(w http.ResponseWriter, r *http.Request) {
  theReturn := some{Name: "somethingelse", Age: 20}
  data, err := json.Marshal(theReturn)
  if err != nil {
    log.Fatal(err)
  }
  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(200)
  w.Write(data)
  fmt.Println("I got hit!")
  return
} 
