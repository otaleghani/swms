// Sources the Server Sent Event
let sse = new EventSource("/api/stream")
let jwt = ""; 

// Handles the messages from the server
sse.onmessage = (event: MessageEvent<any>) => {
  const eventData = JSON.parse(event.data);

  // If the event.data contains the field jwt, then it's the first
  // response. In this special case we would just save the jwt for
  // future usage and return.
  if (eventData.jwt) {
    jwt = eventData.jwt;
    return;
  }

  // Every other message gets relayed to the main thread.
  postMessage(eventData)
}


// Cases where you want to fetch data client side:
// - When a foreign key changes, e.g. You are in the aisles/[id] and you
// change the zone of that id. You want to fetch the new zone.
// - When 

// The main thread can request some other data if needed for rendering
// purposes. In that case the main thread would send a message to this 
// worker asking for a specific resource. The event.data sent would be
// an object containing the type of resource to request and it's id.
onmessage = (event) => {
  clientRetrieve(event.data.type, event.data.id, jwt)
}


// The response used to communicate with the main thread. It contains
// both the type and the id so that only the caller can use this data
// while the other components ignore it. "content" contains the newer
// data fetched from the server.
interface WorkerResponse {
  type: string;
  id: string;
  content: any;
  error: boolean,
}

type AcceptedTypes = "Zone" | "ZoneWithExtra" | "Aisle" | "Rack" | "Shelf" | "Category" | "Subcategory" | "Supplier" | "SupplierCode" | "Item" | "ItemImage" | "Transaction" | "Variant" | "Ticket" | "TicketType" | "TicketState" | "Product" | "ProductImage" | "Client" | "User";

type ClientRetrieveMapOptions = {
  [K in AcceptedTypes]: string;
}

// List all the possible endpoints that can be hit
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

// This function does a get request to the requested type with the
// specified id. If the response is not okay or the code differs from
// a "200" it will return an error message.
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
    const notification: WorkerResponse = {
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
    const notification: WorkerResponse = {
      content: null,
      type: type,
      id: id,
      error: true,
    };
    postMessage(notification);
    return;
  }

  const notification: WorkerResponse = {
    content: body.data,
    type: type,
    id: id,
    error: false,
  };
  postMessage(notification);
}
