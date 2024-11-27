const BACKEND_ENDPOINT = "http://" + self.location.hostname + ":8080";

// Sources the Server Sent Event
let sse = new EventSource("/api/stream")
let jwt = ""; 

// Handles the messages from the server
sse.onmessage = (event: MessageEvent<any>) => {
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
  postMessage(eventData)
}

// The main thread can request some other data if needed for rendering
// purposes. In that case the main thread would send a message to this 
// worker asking for a specific resource. The event.data sent would be
// an object containing the type of resource to request, it's id and
// the request type (create, update, delete).
onmessage = (event) => {
  if (event.data.foreignId) {
    clientListByForeignRetrive({
      page: event.data.page,
      perPage: event.data.perPage,
      filters: event.data.filters,
      paginationOff: event.data.paginationOff,
      type: event.data.type,
      foreignId: event.data.foreignId,
      jwt: jwt,
      request: "refresh"
    })
  } else if (event.data.request === "refresh") {
    // If event.data.refresh exists we want to notify the FetchToastPattern to
    // request a change. Here we want to change
    // Actually here we want to fetch the list
    clientListRetrieve({
      page: event.data.page,
      perPage: event.data.perPage,
      filters: event.data.filters,
      paginationOff: event.data.paginationOff,
      type: event.data.type,
      jwt: jwt,
      request: "refresh"
    })
  } else {
    clientElementRetrieve({
      type: event.data.type, 
      id: event.data.id, 
      jwt: jwt, 
      request: event.data.request})
  }
}


// The response used to communicate with the main thread. It contains
// both the type and the id so that only the caller can use this data
// while the other components ignore it. "content" contains the newer
// data fetched from the server.
interface WorkerResponse {
  type: string;
  id: string;
  content: any;
  /** Request is used by the syncher to understand what kind of 
  * operation to do to the list. */
  request: "create" | "replace" | "delete" | "error" | "refresh"
}

type AcceptedTypes = "Zone" | "ZoneWithExtra" | "Aisle" | "AisleWithExtra"|  "Rack" | "RackWithExtra" | "Shelf" | "ShelfWithExtra" | "Category" | "CategoryWithExtra" | "Subcategory" | "SubcategoryWithExtra" | "Supplier" | "SupplierWithExtra" | "SupplierCode" | "Item" | "ItemImage" | "Transaction" | "Variant" | "Ticket" | "TicketType" | "TicketState" | "Product" | "ProductImage" | "Client" | "User";

type ClientRetrieveMapOptions = {
  [K in AcceptedTypes]: string;
}

// List all the possible endpoints that can be hit
const optionsElement: ClientRetrieveMapOptions = {
  "Zone": "zones/{{id}}",
  "ZoneWithExtra": "zones/{{id}}/extra",
  "Aisle": "aisles/{{id}}",
  "AisleWithExtra": "aisles/{{id}}/extra",
  "Rack": "racks/{{id}}",
  "RackWithExtra": "racks/{{id}}/extra",
  "Shelf": "shelfs/{{id}}",
  "ShelfWithExtra": "shelfs/{{id}}/extra",
  "Category": "catories/{{id}}",
  "Subcategory": "subcategory/{{id}}",
  "CategoryWithExtra": "categories/{{id}}/extra",
  "SubcategoryWithExtra": "subcategories/{{id}}/extra",
  "Supplier": "suppliers/{{id}}",
  "SupplierWithExtra": "suppliers/{{id}}/extra",
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
const clientElementRetrieve = async ({
  type,
  id,
  jwt,
  request,
}: {
  type: AcceptedTypes,
  id: string, 
  jwt: string, 
  request: "create" | "replace" | "delete" | "error" | "refresh"
}) => {
  const apiPath = BACKEND_ENDPOINT + "/api/v1/";

  const option = optionsElement[type as AcceptedTypes];
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
    const notification: WorkerResponse = { content: null, type: type, id: id, request: "error" };
    postMessage(notification);
    return;
  }

  const body = await response.json();

  if (body.code !== 200) {
    const notification: WorkerResponse = {content: null, type: type, id: id, request: "error"};
    postMessage(notification);
    return;
  }

  const notification: WorkerResponse = {content: body.data, type: type, id: id, request: request};
  postMessage(notification);
}


const optionsList: ClientRetrieveMapOptions = {
  "Zone": "zones/",
  "ZoneWithExtra": "zones/extra",
  "Aisle": "aisles/",
  "AisleWithExtra": "aisles/extra",
  "Rack": "racks/",
  "RackWithExtra": "racks/extra",
  "Shelf": "shelfs/",
  "ShelfWithExtra": "shelfs/extra",
  "Category": "categories/",
  "CategoryWithExtra": "categories/extra",
  "Subcategory": "subcategories/",
  "SubcategoryWithExtra": "subcategories/extra",
  "Supplier": "suppliers/",
  "SupplierWithExtra": "suppliers/extra",
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
}

const clientListRetrieve = async ({
  page,
  perPage,
  filters,
  paginationOff,
  type,
  jwt,
  request,
}: {
  page: number,
  perPage: number,
  filters: any,
  paginationOff: boolean,
  type: AcceptedTypes,
  jwt: string, 
  request: "create" | "replace" | "delete" | "error" | "refresh"
}) => {
  const apiPath = BACKEND_ENDPOINT + "/api/v1/";
  const option = optionsList[type as AcceptedTypes];
  let path = option + `?q=""`

  if (paginationOff) { path += `&paginationOff=${paginationOff}` }
  if (page) { path += `&page=${page}` };
  if (perPage) { path += `&perPage=${perPage}` };
  if (filters) { path += `&filters=${filters}` };

  const endpoint = apiPath + path;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    }
  });

  if (!response.ok) {
    const notification: WorkerResponse = { content: null, type: type, id: "", request: "error" };
    postMessage(notification);
    return;
  }

  const body = await response.json();

  if (body.code !== 200) {
    const notification: WorkerResponse = {content: null, type: type, id: "", request: "error"};
    postMessage(notification);
    return;
  }

  const notification: WorkerResponse = {content: body.data, type: type, id: "", request: request};
  postMessage(notification);
}


const optionsListByForeign = {
  "Zone_Aisle":             { path: "aisles/{{id}}/zone", type: "Zone" },
  "Zone_Rack":              { path: "racks/{{id}}/zone", type: "Zone" },
  "Zone_Shelf":             { path: "shelfs/{{id}}/zone", type: "Zone" },

  "Aisle_Rack":             { path: "racks/{{id}}/aisle", type: "Aisle" },
  "Aisle_Shelf":            { path: "shelfs/{{id}}/aisle", type: "Aisle" },
  "Aisles_Zone":            { path: "zones/{{id}}/aisles", type: "Aisles"  },
  "AislesWithExtra_Zone":   { path: "zones/{{id}}/aisles/extra", type: "AislesWithExtra" },

  "Rack_Shelf":             { path: "shelfs/{{id}}/rack", type: "Rack" },
  "Racks_Zone":             { path: "zones/{{id}}/racks", type: "Racks"  },
  "Racks_Aisle":            { path: "aisles/{{id}}/racks", type: "Racks"  },
  "RacksWithExtra_Aisle":   { path: "aisles/{{id}}/racks/extra", type: "RacksWithExtra" },

  "ShelfsWithExtra_Rack":   { path: "racks/{{id}}/shelfs/extra", type: "ShelfsWithExtra"  },
  //"Shelfs_Aisle":           { path: "aisles/{{id}}/racks", type: "Racks"  },
  //"Shelfs_Zone":            { path: "aisles/{{id}}/racks", type: "Racks"  },

  "SupplierCodes_Supplier": { path: "supplier/{{id}}/supplier-codes", type: "Racks"  },
  "SubcategoriesWithExtra_Category": { path: "categories/{{id}}/subcategories/extra", type: "Subcategories"},

  "Items_Zone": { path: "zones/{{id}}/items", type: "Items"},
  "Items_Aisle": { path: "aisles/{{id}}/items", type: "Items"},
  "Items_Rack": { path: "racks/{{id}}/items", type: "Items"},
  "Items_Shelf": { path: "shelfs/{{id}}/items", type: "Items"},
  "Items_Category": { path: "categories/{{id}}/items", type: "Items"},
  "Items_Subcategory": { path: "subcategories/{{id}}/items", type: "Items"},
}

type ListByForeignAcceptedType = "AislesWithExtra_Zone" | "RacksWithExtra_Aisle" | "SupplierCodes_Supplier" | "SubcategoriesWithExtra_Category"

const clientListByForeignRetrive = async ({
  page,
  perPage,
  filters,
  paginationOff,
  type,
  foreignId,
  jwt,
  request,
}: {
  page: number,
  perPage: number,
  filters: any,
  paginationOff: boolean,
  type: ListByForeignAcceptedType,
  jwt: string, 
  foreignId: string, 
  request: "refresh"
}) => {
  const apiPath = BACKEND_ENDPOINT + "/api/v1/";
  const option = optionsListByForeign[type].path;
  let path = option.replace(/{{id}}/g, foreignId); + `?q=""`

  if (paginationOff) { path += `&paginationOff=${paginationOff}` }
  if (page) { path += `&page=${page}` };
  if (perPage) { path += `&perPage=${perPage}` };
  if (filters) { path += `&filters=${filters}` };

  const endpoint = apiPath + path;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    }
  });

  if (!response.ok) {
    const notification: WorkerResponse = { content: null, type: type, id: "", request: "error" };
    postMessage(notification);
    return;
  }

  const body = await response.json();

  if (body.code !== 200) {
    const notification: WorkerResponse = {content: null, type: type, id: "", request: "error"};
    postMessage(notification);
    return;
  }

  const notification: WorkerResponse = {content: body.data, type: type, id: "", request: request};
  postMessage(notification);
}
