package main

import (
	"testing"
  "net/http"
)

// Performance test
func TestUsers(t *testing.T) {
  for i := 0; i < 1000; i++ {
    http.Get("localhost:8080/api/v1/users/")
    for j := 0; j < 1000; j++ {
      http.Get("localhost:8080/api/v1/users/")
    }
  }
}
