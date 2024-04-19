package server

import(
  "net/http"
)

// Here I have to take into consideration the
// mux policies
// So like how do I 
// wait.. no I do have to handle the mux only
// on the db side of things

func handler() {
  // Create a new DB
  const defaultPort = "8080"
  mux := http.NewServeMux()

  mux.HandleFunc("GET /some/thing", handleSomething)
  // here some other HandleFunc

  corsMux := middlewareCors(mux)
  srv := &http.Server{
    Addr: ":" + defaultPort,
    Handler: corsMux,
  }
}
