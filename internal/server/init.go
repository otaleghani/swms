package server

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/otaleghani/swms/internal/database"
)

func Serve(path, port string) {
	dbConn := database.Database{}
	_, err := os.Stat(path)
	if os.IsNotExist(err) {
		dbConn, err = database.Init(path)
		if err != nil {
			log.Println("ERROR: ", err)
			return
		}
		err = generateJwtSecret(20, &dbConn)
		if err != nil {
			log.Println("ERROR: ", err)
			return
		}
	} else {
		dbConn, err = database.Open(path)
		if err != nil {
			log.Println("ERROR: ", err)
			return
		}
	}

	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/v1/items/{$}", getItems(&dbConn))
	mux.HandleFunc("POST /api/v1/items/{$}", postItems(&dbConn))
	mux.HandleFunc("GET /api/v1/items/{id}", getItemById(&dbConn))
	mux.HandleFunc("PUT /api/v1/items/{id}", putItem(&dbConn))
	mux.HandleFunc("DELETE /api/v1/items/{id}", deleteItem(&dbConn))

	mux.HandleFunc("GET /api/v1/users/{$}", getUsers(&dbConn))
	mux.HandleFunc("POST /api/v1/users/{$}", postUsers(&dbConn))
	mux.HandleFunc("GET /api/v1/users/{id}", getUserById(&dbConn))
	mux.HandleFunc("PUT /api/v1/users/{id}", putUser(&dbConn))
	mux.HandleFunc("DELETE /api/v1/users/{id}", deleteUser(&dbConn))

	mux.HandleFunc("GET /api/v1/categories/{$}", getCategories(&dbConn))
	mux.HandleFunc("POST /api/v1/categories/{$}", postCategories(&dbConn))
	mux.HandleFunc("GET /api/v1/categories/{id}", getCategoryById(&dbConn))
	mux.HandleFunc("PUT /api/v1/categories/{id}", putCategory(&dbConn))
	mux.HandleFunc("DELETE /api/v1/categories/{id}", deleteCategory(&dbConn))

	mux.HandleFunc("GET /api/v1/subcategories/{$}", getSubcategories(&dbConn))
	mux.HandleFunc("POST /api/v1/subcategories/{$}", postSubcategories(&dbConn))
	mux.HandleFunc("GET /api/v1/subcategories/{id}", getSubcategoryById(&dbConn))
	mux.HandleFunc("PUT /api/v1/subcategories/{id}", putSubcategory(&dbConn))
	mux.HandleFunc("DELETE /api/v1/subcategories/{id}", deleteSubcategory(&dbConn))

	mux.HandleFunc("GET /api/v1/item-images/{$}", getItemImages(&dbConn))
	mux.HandleFunc("POST /api/v1/item-images/{$}", postItemImages(&dbConn))
	mux.HandleFunc("GET /api/v1/item-images/{id}", getItemImageById(&dbConn))
	mux.HandleFunc("PUT /api/v1/item-images/{id}", putItemImage(&dbConn))
	mux.HandleFunc("DELETE /api/v1/item-images/{id}", deleteItemImage(&dbConn))
	// mux.HandleFunc("GET /api/v1/item-images/item/{id}", getItemImageById(&dbConn))

  
	mux.HandleFunc("GET /api/v1/zones/{$}", getZones(&dbConn))
	mux.HandleFunc("POST /api/v1/zones/{$}", postZones(&dbConn))
	mux.HandleFunc("GET /api/v1/zones/{id}", getZoneById(&dbConn))
	mux.HandleFunc("PUT /api/v1/zones/{id}", putZone(&dbConn))
	mux.HandleFunc("DELETE /api/v1/zones/{id}", deleteZone(&dbConn))

	mux.HandleFunc("GET /api/v1/aisles/{$}", getAisles(&dbConn))
	mux.HandleFunc("POST /api/v1/aisles/{$}", postAisles(&dbConn))
	mux.HandleFunc("GET /api/v1/aisles/{id}", getAisleById(&dbConn))
	mux.HandleFunc("PUT /api/v1/aisles/{id}", putAisle(&dbConn))
	mux.HandleFunc("DELETE /api/v1/aisles/{id}", deleteAisle(&dbConn))

	mux.HandleFunc("GET /api/v1/racks/{$}", getRacks(&dbConn))
	mux.HandleFunc("POST /api/v1/racks/{$}", postRacks(&dbConn))
	mux.HandleFunc("GET /api/v1/racks/{id}", getRackById(&dbConn))
	mux.HandleFunc("PUT /api/v1/racks/{id}", putRack(&dbConn))
	mux.HandleFunc("DELETE /api/v1/racks/{id}", deleteRack(&dbConn))

	mux.HandleFunc("GET /api/v1/shelfs/{$}", getShelfs(&dbConn))
	mux.HandleFunc("POST /api/v1/shelfs/{$}", postShelfs(&dbConn))
	mux.HandleFunc("GET /api/v1/shelfs/{id}", getShelfById(&dbConn))
	mux.HandleFunc("PUT /api/v1/shelfs/{id}", putShelf(&dbConn))
	mux.HandleFunc("DELETE /api/v1/shelfs/{id}", deleteShelf(&dbConn))

	mux.HandleFunc("GET /api/v1/variants/{$}", getVariants(&dbConn))
	mux.HandleFunc("POST /api/v1/variants/{$}", postVariants(&dbConn))
	mux.HandleFunc("GET /api/v1/variants/{id}", getVariantById(&dbConn))
	mux.HandleFunc("PUT /api/v1/variants/{id}", putVariant(&dbConn))
	mux.HandleFunc("DELETE /api/v1/variants/{id}", deleteVariant(&dbConn))

	mux.HandleFunc("GET /api/v1/suppliers/{$}", getSuppliers(&dbConn))
	mux.HandleFunc("POST /api/v1/suppliers/{$}", postSuppliers(&dbConn))
	mux.HandleFunc("GET /api/v1/suppliers/{id}", getSupplierById(&dbConn))
	mux.HandleFunc("PUT /api/v1/suppliers/{id}", putSupplier(&dbConn))
	mux.HandleFunc("DELETE /api/v1/suppliers/{id}", deleteSupplier(&dbConn))

	mux.HandleFunc("GET /api/v1/supplier-codes/{$}", getSupplierCodes(&dbConn))
	mux.HandleFunc("POST /api/v1/supplier-codes/{$}", postSupplierCodes(&dbConn))
	mux.HandleFunc("GET /api/v1/supplier-codes/{id}", getSupplierCodeById(&dbConn))
	mux.HandleFunc("PUT /api/v1/supplier-codes/{id}", putSupplierCode(&dbConn))
	mux.HandleFunc("DELETE /api/v1/supplier-codes/{id}", deleteSupplierCode(&dbConn))

  // Missing: Position
  // Missing: Variant

	mux.HandleFunc("POST /api/v1/login/{$}", login(&dbConn))
	mux.HandleFunc("POST /api/v1/revoke/{$}", revokeHandler(&dbConn))
	mux.HandleFunc("POST /api/v1/refresh/{$}", refreshHandler(&dbConn))

	corsMux := middlewareCors(mux)
	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           corsMux,
		ReadTimeout:       time.Second * 5,
		ReadHeaderTimeout: time.Second * 5,
		WriteTimeout:      time.Second * 5,
		IdleTimeout:       time.Second * 5,
	}
	logMsg(fmt.Sprintf("Serving on port: %s", port))
	log.Fatal(srv.ListenAndServe())
}

func handleTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("sandro"))
}
