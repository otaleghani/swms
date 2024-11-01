"use strict";
// Sources the Server Sent Event
let sse = new EventSource("/api/stream");
let jwt = "";
// Handles the messages from the server
sse.onmessage = (event) => {
    const eventData = JSON.parse(event.data);
    //console.log(eventData)
    // If the event.data contains the field jwt, then it's the first
    // response. In this special case we would just save the jwt for
    // future usage and return.
    if (eventData.jwt) {
        jwt = eventData.jwt;
        return;
    }
    // Every other message gets relayed to the main thread.
    postMessage(eventData);
};
// The main thread can request some other data if needed for rendering
// purposes. In that case the main thread would send a message to this 
// worker asking for a specific resource. The event.data sent would be
// an object containing the type of resource to request, it's id and
// the request type (create, update, delete).
onmessage = (event) => {
    if (event.data.request === "refresh") {
        // If event.data.refresh exists we want to notify the FetchToastPattern to
        // request a change. Here we want to change
        // Actually here we want to fetch the list
        clientListRetrieve({
            page: event.data.page,
            perPage: event.data.perPage,
            filters: event.data.filters,
            type: event.data.type,
            jwt: jwt,
            request: "refresh"
        });
        //postMessage({
        //  type: event.data.type,
        //  refresh: true,
        //});
    }
    else {
        clientElementRetrieve({
            type: event.data.type,
            id: event.data.id,
            jwt: jwt,
            request: event.data.request
        });
    }
};
// List all the possible endpoints that can be hit
const optionsElement = {
    "Zone": "zones/{{id}}",
    "ZoneWithExtra": "zones/{{id}}/extra",
    "Aisle": "aisles/{{id}}",
    "AisleWithExtra": "aisles/{{id}}/extra/",
    "Rack": "racks/{{id}}",
    "Shelf": "shelfs/{{id}}",
    "Category": "catories/{{id}}",
    "Subcategory": "subcategory/{{id}}",
    "Supplier": "suppliers/{{id}}",
    "SupplierCode": "supplier-codes/{{id}}",
    "Item": "items/{{id}}",
    "ItemImage": "item-images/{{id}}",
    "Transaction": "transition/{{id}}",
    "Variant": "variants/{{id}}",
    "Ticket": "tickets/{{id}}",
    "TicketType": "ticket-types/{{id}}",
    "TicketState": "aisles-states/{{id}}",
    "Product": "products/{{id}}",
    "ProductImage": "product-images/{{id}}",
    "Client": "clients/{{id}}",
    "User": "users/{{id}}",
};
// This function does a get request to the requested type with the
// specified id. If the response is not okay or the code differs from
// a "200" it will return an error message.
const clientElementRetrieve = async ({ type, id, jwt, request, }) => {
    const apiPath = "http://localhost:8080/api/v1/";
    const option = optionsElement[type];
    const path = option.replace(/{{id}}/g, id);
    const endpoint = apiPath + path;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        }
    });
    if (!response.ok) {
        const notification = { content: null, type: type, id: id, request: "error" };
        postMessage(notification);
        return;
    }
    const body = await response.json();
    if (body.code !== 200) {
        const notification = { content: null, type: type, id: id, request: "error" };
        postMessage(notification);
        return;
    }
    const notification = { content: body.data, type: type, id: id, request: request };
    postMessage(notification);
};
const optionsList = {
    "Zone": "zones/",
    "ZoneWithExtra": "zones/extra/",
    "Aisle": "aisles/",
    "AisleWithExtra": "aisles/extra/",
    "Rack": "racks/",
    "Shelf": "shelfs/",
    "Category": "catories/",
    "Subcategory": "subcategory/",
    "Supplier": "suppliers/",
    "SupplierCode": "supplier-codes/",
    "Item": "items/",
    "ItemImage": "item-images/",
    "Transaction": "transition/",
    "Variant": "variants/",
    "Ticket": "tickets/",
    "TicketType": "ticket-types/",
    "TicketState": "aisles-states/",
    "Product": "products/",
    "ProductImage": "product-images/",
    "Client": "clients/",
    "User": "users/",
};
const clientListRetrieve = async ({ page, perPage, filters, type, jwt, request, }) => {
    const apiPath = "http://localhost:8080/api/v1/";
    const option = optionsList[type];
    let path = option + `?q=""`;
    if (page) {
        path += `&page=${page}`;
    }
    if (perPage) {
        path += `&perPage=${perPage}`;
    }
    if (filters) {
        path += `&filters=${filters}`;
    }
    const endpoint = apiPath + path;
    console.log(endpoint);
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        }
    });
    if (!response.ok) {
        const notification = { content: null, type: type, id: "", request: "error" };
        postMessage(notification);
        return;
    }
    const body = await response.json();
    if (body.code !== 200) {
        const notification = { content: null, type: type, id: "", request: "error" };
        postMessage(notification);
        return;
    }
    const notification = { content: body.data, type: type, id: "", request: request };
    postMessage(notification);
};
