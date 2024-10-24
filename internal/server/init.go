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

  media_path := "./media"
  if _, err := os.Stat(media_path); os.IsNotExist(err) {
    err := os.MkdirAll(media_path, os.ModePerm);
    if err != nil {
      log.Println("ERROR: ", err)
      return
    }
  }

	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/v1/items/{$}", getItems(&dbConn))
	mux.HandleFunc("GET /api/v1/items/{id}/supplier-codes/{$}", getItems(&dbConn))
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
	mux.HandleFunc("GET /api/v1/categories/{id}", getCategoryById(&dbConn))
	mux.HandleFunc("GET /api/v1/categories/{id}/subcategories", getSubcategoriesByCategory(&dbConn))
	mux.HandleFunc("POST /api/v1/categories/{$}", postCategories(&dbConn))
	mux.HandleFunc("PUT /api/v1/categories/{id}", putCategory(&dbConn))
	mux.HandleFunc("POST /api/v1/categories/{id}/replace-with/{rep}", deleteCategorySub(&dbConn))
	mux.HandleFunc("DELETE /api/v1/categories/{id}", deleteCategory(&dbConn))

	mux.HandleFunc("GET /api/v1/subcategories/{$}", getSubcategories(&dbConn))
	mux.HandleFunc("GET /api/v1/subcategories/{id}", getSubcategoryById(&dbConn))
	mux.HandleFunc("GET /api/v1/subcategories/{id}/category", getCategoryBySubcategory(&dbConn))
	mux.HandleFunc("POST /api/v1/subcategories/{$}", postSubcategories(&dbConn))
	mux.HandleFunc("PUT /api/v1/subcategories/{id}", putSubcategory(&dbConn))
	mux.HandleFunc("DELETE /api/v1/subcategories/{id}", deleteSubcategory(&dbConn))
	mux.HandleFunc("POST /api/v1/subcategories/{id}/replace-with/{rep}", deleteSubcategorySub(&dbConn))

  // This was reworked, the others not.
	mux.HandleFunc("POST /api/v1/item-images/{$}", postItemImage(&dbConn))

	mux.HandleFunc("GET /api/v1/item-images/{$}", getItemImages(&dbConn))
	mux.HandleFunc("GET /api/v1/item-images/{id}", getItemImageById(&dbConn))
	mux.HandleFunc("PUT /api/v1/item-images/{id}", putItemImage(&dbConn))
	mux.HandleFunc("DELETE /api/v1/item-images/{id}", deleteItemImage(&dbConn))
	// mux.HandleFunc("GET /api/v1/item-images/item/{id}", getItemImageById(&dbConn))

	mux.HandleFunc("GET /api/v1/zones/{$}", getZones(&dbConn))
	mux.HandleFunc("POST /api/v1/zones/{$}", postZones(&dbConn))
	mux.HandleFunc("GET /api/v1/zones/{id}", getZoneById(&dbConn))
	mux.HandleFunc("GET /api/v1/zones/{id}/extra", getZoneByIdWithData(&dbConn))
	mux.HandleFunc("PUT /api/v1/zones/{id}", putZone(&dbConn))
	mux.HandleFunc("DELETE /api/v1/zones/{id}", deleteZone(&dbConn))
	mux.HandleFunc("POST /api/v1/zones/bulk/{$}", postBulkZones(&dbConn))
	mux.HandleFunc("GET /api/v1/zones/extra/{$}", getZonesWithData(&dbConn))
	mux.HandleFunc("POST /api/v1/zones/{id}/replace-with/{rep}", deleteZoneSub(&dbConn))
  // to do => zones/{id}/extra
  // and all of the others...

	mux.HandleFunc("GET /api/v1/aisles/{$}", getAisles(&dbConn))
	mux.HandleFunc("POST /api/v1/aisles/{$}", postAisles(&dbConn))
	mux.HandleFunc("GET /api/v1/aisles/{id}", getAisleById(&dbConn))
	mux.HandleFunc("PUT /api/v1/aisles/{id}", putAisle(&dbConn))
	mux.HandleFunc("DELETE /api/v1/aisles/{id}", deleteAisle(&dbConn))
	mux.HandleFunc("GET /api/v1/zones/{id}/aisles", getAislesByZone(&dbConn))
	mux.HandleFunc("GET /api/v1/zones/{id}/aisles/extra", getAislesByZoneWithData(&dbConn))
	mux.HandleFunc("POST /api/v1/aisles/bulk/{$}", postBulkAisles(&dbConn))
	mux.HandleFunc("GET /api/v1/aisles/extra/{$}", getAislesWithData(&dbConn))
	mux.HandleFunc("GET /api/v1/aisles/{id}/zone/{$}", getZoneByAisleId(&dbConn))
	mux.HandleFunc("POST /api/v1/aisles/{id}/replace-with/{rep}", deleteAisleSub(&dbConn))

	mux.HandleFunc("GET /api/v1/racks/{$}", getRacks(&dbConn))
	mux.HandleFunc("POST /api/v1/racks/{$}", postRacks(&dbConn))
	mux.HandleFunc("GET /api/v1/racks/{id}", getRackById(&dbConn))
	mux.HandleFunc("PUT /api/v1/racks/{id}", putRack(&dbConn))
	mux.HandleFunc("DELETE /api/v1/racks/{id}", deleteRack(&dbConn))
	mux.HandleFunc("POST /api/v1/racks/bulk/{$}", postBulkRacks(&dbConn))
	mux.HandleFunc("GET /api/v1/aisles/{id}/racks/extra", getRacksByAisleWithData(&dbConn))
	//mux.HandleFunc("GET /api/v1/racks/extra/{$}", getRacksWithData(&dbConn))
	mux.HandleFunc("GET /api/v1/racks/{id}/zone/{$}", getZoneByRackId(&dbConn))
	mux.HandleFunc("GET /api/v1/racks/{id}/aisle/{$}", getAisleByRackId(&dbConn))
	mux.HandleFunc("GET /api/v1/racks/extra/{$}", getRacksWithData(&dbConn))
	mux.HandleFunc("POST /api/v1/racks/{id}/replace-with/{rep}", deleteRackSub(&dbConn))

	mux.HandleFunc("GET /api/v1/shelfs/{$}", getShelfs(&dbConn))
	mux.HandleFunc("POST /api/v1/shelfs/{$}", postShelfs(&dbConn))
	mux.HandleFunc("GET /api/v1/shelfs/{id}", getShelfById(&dbConn))
	mux.HandleFunc("PUT /api/v1/shelfs/{id}", putShelf(&dbConn))
	mux.HandleFunc("DELETE /api/v1/shelfs/{id}", deleteShelf(&dbConn))
	mux.HandleFunc("GET /api/v1/racks/{id}/shelfs/extra", getShelfsByRackWithData(&dbConn))
	mux.HandleFunc("POST /api/v1/shelfs/bulk/{$}", postBulkShelfs(&dbConn))
	mux.HandleFunc("GET /api/v1/shelfs/{id}/zone/{$}", getZoneByShelfId(&dbConn))
	mux.HandleFunc("GET /api/v1/shelfs/{id}/aisle/{$}", getAisleByShelfId(&dbConn))
	mux.HandleFunc("GET /api/v1/shelfs/{id}/rack/{$}", getRackByShelfId(&dbConn))
	mux.HandleFunc("GET /api/v1/shelfs/extra/{$}", getShelfsWithData(&dbConn))
	mux.HandleFunc("POST /api/v1/shelfs/{id}/replace-with/{rep}", deleteShelfSub(&dbConn))

	mux.HandleFunc("GET /api/v1/variants/{$}", getVariants(&dbConn))
	mux.HandleFunc("POST /api/v1/variants/{$}", postVariants(&dbConn))
	mux.HandleFunc("GET /api/v1/variants/{id}", getVariantById(&dbConn))
	mux.HandleFunc("PUT /api/v1/variants/{id}", putVariant(&dbConn))
	mux.HandleFunc("DELETE /api/v1/variants/{id}", deleteVariant(&dbConn))

	mux.HandleFunc("GET /api/v1/suppliers/{$}", getSuppliers(&dbConn))
	mux.HandleFunc("GET /api/v1/suppliers/extra/{$}", getSuppliersWithData(&dbConn))
	mux.HandleFunc("GET /api/v1/suppliers/{id}/codes/{$}", getSupplierCodesBySupplierWithItem(&dbConn))
	mux.HandleFunc("GET /api/v1/suppliers/{id}", getSupplierById(&dbConn))
	mux.HandleFunc("GET /api/v1/suppliers/{id}/extra/{$}", getSupplierByIdWithData(&dbConn))
	mux.HandleFunc("POST /api/v1/suppliers/{$}", postSuppliers(&dbConn))
	mux.HandleFunc("POST /api/v1/suppliers/{id}/replace-with/{rep}", deleteSupplierSub(&dbConn))
	mux.HandleFunc("PUT /api/v1/suppliers/{id}", putSupplier(&dbConn))
	mux.HandleFunc("DELETE /api/v1/suppliers/{id}", deleteSupplier(&dbConn))

	mux.HandleFunc("GET /api/v1/supplier-codes/{$}", getSupplierCodes(&dbConn))
	mux.HandleFunc("GET /api/v1/supplier-codes/extra/{$}", getSupplierCodesWithData(&dbConn))
	mux.HandleFunc("GET /api/v1/supplier-codes/{id}", getSupplierCodeById(&dbConn))
	mux.HandleFunc("POST /api/v1/supplier-codes/{$}", postSupplierCodes(&dbConn))
	mux.HandleFunc("PUT /api/v1/supplier-codes/{id}", putSupplierCode(&dbConn))
	mux.HandleFunc("DELETE /api/v1/supplier-codes/{id}", deleteSupplierCode(&dbConn))

	mux.HandleFunc("GET /api/v1/operations/{$}", getOperations(&dbConn))
	mux.HandleFunc("POST /api/v1/operations/{$}", postOperation(&dbConn))
	mux.HandleFunc("GET /api/v1/operations/{id}", getOperationById(&dbConn))
	mux.HandleFunc("PUT /api/v1/operations/{id}", putOperation(&dbConn))
	mux.HandleFunc("DELETE /api/v1/operations/{id}", deleteOperation(&dbConn))

	mux.HandleFunc("GET /api/v1/products/{$}", getProducts(&dbConn))
	mux.HandleFunc("POST /api/v1/products/{$}", postProducts(&dbConn))
	mux.HandleFunc("GET /api/v1/products/{id}", getProductById(&dbConn))
	mux.HandleFunc("PUT /api/v1/products/{id}", putProduct(&dbConn))
	mux.HandleFunc("DELETE /api/v1/products/{id}", deleteProduct(&dbConn))

	mux.HandleFunc("GET /api/v1/product-images/{$}", getProductImages(&dbConn))
	mux.HandleFunc("POST /api/v1/product-images/{$}", postProductImages(&dbConn))
	mux.HandleFunc("GET /api/v1/product-images/{id}", getProductImageById(&dbConn))
	mux.HandleFunc("PUT /api/v1/product-images/{id}", putProductImage(&dbConn))
	mux.HandleFunc("DELETE /api/v1/product-images/{id}", deleteProductImage(&dbConn))

	mux.HandleFunc("GET /api/v1/clients/{$}", getClients(&dbConn))
	mux.HandleFunc("POST /api/v1/clients/{$}", postClients(&dbConn))
	mux.HandleFunc("GET /api/v1/clients/{id}", getClientById(&dbConn))
	mux.HandleFunc("PUT /api/v1/clients/{id}", putClient(&dbConn))
	mux.HandleFunc("DELETE /api/v1/clients/{id}", deleteClient(&dbConn))

	mux.HandleFunc("GET /api/v1/ticket-states/{$}", getTicketStates(&dbConn))
	mux.HandleFunc("POST /api/v1/ticket-states/{$}", postTicketStates(&dbConn))
	mux.HandleFunc("GET /api/v1/ticket-states/{id}", getTicketStateById(&dbConn))
	mux.HandleFunc("PUT /api/v1/ticket-states/{id}", putTicketState(&dbConn))
	mux.HandleFunc("DELETE /api/v1/ticket-states/{id}", deleteTicketState(&dbConn))

	mux.HandleFunc("GET /api/v1/ticket-types/{$}", getTicketTypes(&dbConn))
	mux.HandleFunc("POST /api/v1/ticket-types/{$}", postTicketTypes(&dbConn))
	mux.HandleFunc("GET /api/v1/ticket-types/{id}", getTicketTypeById(&dbConn))
	mux.HandleFunc("PUT /api/v1/ticket-types/{id}", putTicketType(&dbConn))
	mux.HandleFunc("DELETE /api/v1/ticket-types/{id}", deleteTicketType(&dbConn))

	mux.HandleFunc("GET /api/v1/tickets/{$}", getTickets(&dbConn))
	mux.HandleFunc("POST /api/v1/tickets/{$}", postTickets(&dbConn))
	mux.HandleFunc("GET /api/v1/tickets/{id}", getTicketById(&dbConn))
	mux.HandleFunc("PUT /api/v1/tickets/{id}", putTicket(&dbConn))
	mux.HandleFunc("DELETE /api/v1/tickets/{id}", deleteTicket(&dbConn))
  // Missing: Position
  // Missing: Variant

	mux.HandleFunc("POST /api/v1/login/{$}", login(&dbConn))
	mux.HandleFunc("POST /api/v1/revoke/{$}", revokeHandler(&dbConn))
  mux.HandleFunc("POST /api/v1/refresh/{$}", refreshHandler(&dbConn))

  mux.HandleFunc("GET /api/v1/settings/{$}", getSettings(&dbConn))
  mux.HandleFunc("PUT /api/v1/settings/{$}", putSettings(&dbConn))

  // fileserver
  // fileserver := http.FileServer(http.Dir("./media"))
  // mux.Handle("GET /media/", http.StripPrefix("/media", fileserver))
  mux.HandleFunc("GET /media/", getMedia(&dbConn))
  // mux.HandleFunc("POST /media/{$}", postMedia(&dbConn))

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
