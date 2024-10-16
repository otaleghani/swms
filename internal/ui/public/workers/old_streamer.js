"use strict";
// worker/streamer.ts
// Creates a new Server-sent event request to the /api/stream endpoint
// and everytime a message is sent it gets parsed and sent to the
// main thread.
// Every type is re-declared because if not the imports would get 
// compiled and shipped
//type AcceptedTypes = "Zone" | "Aisle" | "Rack" | "Shelf" | "Category" | "Subcategory" | "Supplier" | "SupplierCode" | "Item" | "ItemImage" | "Transaction" | "Variant" | "Ticket" | "TicketType" | "TicketState" | "Product" | "ProductImage" | "Client" | "User";
//
//// Creates the type that lists every endpoint
//type ClientRetrieveMapOptions = {
//  [K in AcceptedTypes]: string;
//}
//
//// Lists every option to interact with the backend
//const options: ClientRetrieveMapOptions = {
//  "Zone": "zones/{{id}}",
//  "Aisle": "aisles/{{id}}",
//  "Rack": "racks/{{id}}",
//  "Shelf": "shelfs/{{id}}",
//  "Category": "catories/{{id}}",
//  "Subcategory": "subcategory/{{id}}",
//  "Supplier": "suppliers/{{id}}",
//  "SupplierCode": "supplier-codes/{{id}}",
//  "Item": "items/{{id}}",
//  "ItemImage": "item-images/{{id}}",
//  "Transaction": "transition/{{id}}",
//  "Variant": "variants/{{id}}",
//  "Ticket": "tickets/{{id}}",
//  "TicketType": "ticket-types/{{id}}",
//  "TicketState": "aisles-states/{{id}}",
//  "Product": "products/{{id}}",
//  "ProductImage": "product-images/{{id}}",
//  "Client": "clients/{{id}}",
//  "User": "users/{{id}}",
//}
//
//// Describes the data field of the streamed message
//interface WorkerResponse {
//  content: any;
//  id: string;
//  type: string;
//  action: "create" | "createInBulk" | "remove" | "replace" | "update",
//}
//
//// Here we need a kind of generic like we made
//const retrieve = async (
//  id: string, 
//  jwt: string, 
//  type: AcceptedTypes,
//  action: "create" | "createInBulk" | "remove" | "replace" | "update",
//) => {
//  const option = options[type as AcceptedTypes];
//  const path = option.replace(/{{id}}/g, id);
//  const apiPath = "http://localhost:8080/api/v1/";
//  const endpoint = apiPath + path;
//
//  const response = await fetch(endpoint, {
//    method: "GET",
//    headers: { 
//      "Content-Type": "application/json",
//      "Authorization": `Bearer ${jwt}`,
//    }
//  });
//
//  if (!response.ok) {
//    // Response with error?
//  }
//
//  const body = await response.json();
//  const notification: WorkerResponse = {
//    content: body.data,
//    type: type,
//    id: id,
//    action: action
//  };
//  postMessage(notification);
//}
//
//let sse = new EventSource("/api/stream")
//let jwt = ""; 
//
//sse.onmessage = (event: MessageEvent<any>) => {
//  const eventData = JSON.parse(event.data);
//
//  if (eventData.jwt) {
//    // if jwt is defined it's the first message
//    jwt = eventData.jwt;
//    return;
//  }
//
//  postMessage(eventData)
//}
// instead of doing the retrive directly, you could for example talk to the 
//onmessage = (event) => {
//  //console.log(event)
//  // returns the thing that we want to retrieve
//  const eventData = event.data;
//  if (eventData.action === "create") {
//    retrieve(eventData.id, jwt, eventData.type, eventData.action);
//  }
//  if (eventData.action === "createInBulk") {
//    const notification: WorkerResponse = {
//      type: eventData.data,
//      action: eventData.action,
//      content: "",
//      id: "",
//    };
//    postMessage(notification);
//  }
//  if (eventData.action === "remove") {
//    // remove returns the id of the deleted item
//    retrieve(eventData.id, jwt, eventData.type, eventData.action);
//  }
//  if (eventData.action === "replace") {
//    // replace returns the id of the deleted item
//    retrieve(eventData.id, jwt, eventData.type, eventData.action);
//  }
//  if (eventData.action === "update") {
//    // update returns the id of the updated item
//    retrieve(eventData.id, jwt, eventData.type, eventData.action);
//  }
//}
