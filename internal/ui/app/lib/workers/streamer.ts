// worker/streamer.ts

let sse = new EventSource("/api/stream")
let jwt = ""; 

sse.onmessage = (event: MessageEvent<any>) => {
  const eventData = JSON.parse(event.data);

  if (eventData.jwt) {
    // if jwt is defined it's the first message
    jwt = eventData.jwt;
    return;
  }

  postMessage(eventData)
}


// Cases where you want to fetch data client side:
// - When a foreign key changes, e.g. You are in the aisles/[id] and you
// change the zone of that id. You want to fetch the new zone.
// - When 
onmessage = (event) => {
  //console.log(event)
  const eventData = event.data;
  //console.log(eventData)
  
  clientRetrieve(event.data.type, event.data.id, jwt)

  //if (eventData.action === "create") {
  //  retrieve(eventData.id, jwt, eventData.type, eventData.action);
  //}
  //if (eventData.action === "createInBulk") {
  //  const notification: WorkerResponse = {
  //    error: 
  //    type: eventData.data,
  //    content: "",
  //    id: "",
  //  };
  //  postMessage(notification);
  //}
  //if (eventData.action === "remove") {
  //  // remove returns the id of the deleted item
  //  retrieve(eventData.id, jwt, eventData.type, eventData.action);
  //}
  //if (eventData.action === "replace") {
  //  // replace returns the id of the deleted item
  //  retrieve(eventData.id, jwt, eventData.type, eventData.action);
  //}
  //if (eventData.action === "update") {
  //  // update returns the id of the updated item
  //  retrieve(eventData.id, jwt, eventData.type, eventData.action);
  //}
}


// FETCHING DATA
interface WorkerResponse {
  type: string;
  id: string;
  content: any;
  error: boolean,
}

type AcceptedTypes = "Zone" | "ZoneWithExtra" | "Aisle" | "Rack" | "Shelf" | "Category" | "Subcategory" | "Supplier" | "SupplierCode" | "Item" | "ItemImage" | "Transaction" | "Variant" | "Ticket" | "TicketType" | "TicketState" | "Product" | "ProductImage" | "Client" | "User";

// Creates the type that lists every endpoint
type ClientRetrieveMapOptions = {
  [K in AcceptedTypes]: string;
}

// Lists every option to interact with the backend
const options: ClientRetrieveMapOptions = {
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
}

const clientRetrieve = async (
  type: AcceptedTypes,
  id: string, 
  jwt: string, 
) => {
  const option = options[type as AcceptedTypes];
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
    // Response with error?
  }

  const body = await response.json();
  const notification: WorkerResponse = {
    content: body.data,
    type: type,
    id: id,
    error: false,
  };

  postMessage(notification);
}
