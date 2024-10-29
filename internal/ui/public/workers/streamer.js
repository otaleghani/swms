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
// Cases where you want to fetch data client side:
// - When a foreign key changes, e.g. You are in the aisles/[id] and you
// change the zone of that id. You want to fetch the new zone.
// - When 
// The main thread can request some other data if needed for rendering
// purposes. In that case the main thread would send a message to this 
// worker asking for a specific resource. The event.data sent would be
// an object containing the type of resource to request and it's id.
onmessage = (event) => {
    console.log(event.data);
    clientRetrieve(event.data.type, event.data.id, jwt);
};
// List all the possible endpoints that can be hit
const options = {
    "Zone": "zones/{{id}}",
    "ZoneWithExtra": "zones/{{id}}/extra",
    "Aisle": "aisles/{{id}}",
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
const clientRetrieve = async (type, id, jwt) => {
    const option = options[type];
    const path = option.replace(/{{id}}/g, id);
    const apiPath = "http://localhost:8080/api/v1/";
    const endpoint = apiPath + path;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        }
    });
    if (!response.ok) {
        const notification = {
            content: null,
            type: type,
            id: id,
            error: true,
        };
        postMessage(notification);
        return;
    }
    const body = await response.json();
    if (body.code !== 200) {
        const notification = {
            content: null,
            type: type,
            id: id,
            error: true,
        };
        postMessage(notification);
        return;
    }
    const notification = {
        content: body.data,
        type: type,
        id: id,
        error: false,
    };
    postMessage(notification);
};
