package server

import (
	"encoding/json"
	"net/http"
)

type ErrorDetail struct {
	Field string `json:"field"`
	Issue string `json:"issue"`
}

type ErrorResponse struct {
	Code    int           `json:"code"`
	Message string        `json:"message,omitempty"`
	Details []ErrorDetail `json:"details,omitempty"`
}

func (e ErrorResponse) Send(w http.ResponseWriter, r *http.Request) {
	body, err := json.Marshal(e)
	if err != nil {
		http.Error(w, "Error parsing json error message", 500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(e.Code)
	w.Write(body)
	logRequest(r.Method, r.URL.Path, r.RemoteAddr, e.Code)
}

func (e ErrorResponse) r400(w http.ResponseWriter, r *http.Request) {
	e.Code = http.StatusBadRequest
	e.Send(w, r)
}
func (e ErrorResponse) r401(w http.ResponseWriter, r *http.Request) {
	e.Code = http.StatusUnauthorized
	e.Send(w, r)
}
func (e ErrorResponse) r403(w http.ResponseWriter, r *http.Request) {
	e.Code = http.StatusForbidden
	e.Send(w, r)
}
func (e ErrorResponse) r404(w http.ResponseWriter, r *http.Request) {
	e.Code = http.StatusNotFound
	e.Send(w, r)
}
func (e ErrorResponse) r500(w http.ResponseWriter, r *http.Request) {
	e.Code = http.StatusInternalServerError
	e.Send(w, r)
}

//**********************************************************************//

type SuccessResponse struct {
	Code    int         `json:"code"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func (s SuccessResponse) Send(w http.ResponseWriter, r *http.Request) {
	body, err := json.Marshal(s)
	if err != nil {
		http.Error(w, "Error parsing json error message", 500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(s.Code)
	w.Write(body)
	logRequest(r.Method, r.URL.Path, r.RemoteAddr, s.Code)
}

func (s SuccessResponse) r200(w http.ResponseWriter, r *http.Request) {
	s.Code = http.StatusOK
	s.Send(w, r)
}
func (s SuccessResponse) r201(w http.ResponseWriter, r *http.Request) {
	s.Code = http.StatusCreated
	s.Send(w, r)
}
