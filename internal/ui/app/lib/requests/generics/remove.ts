"use server";

/** SSE fields */
import stringEmitter from "../../emitters";
import { ServerSentEventData } from "@/app/api/stream/route";

/** Actions */
import fetchData from "../fetch";

/** Consts */
import { revalidateTags } from "../tags";

/** Types and interfaces*/
import { 
  RequestOptions, 
  TypeMap,
  TypeMapFilterSingles
} from "../../types/requests";

type RemoveMapOptions = {
  [K in Exclude<keyof TypeMapFilterSingles,
    "ZoneWithExtra" |
    "AisleWithExtra" |
    "RackWithExtra" |
    "ShelfWithExtra" |
    "SupplierWithExtra" |
    "SupplierCodeWithExtra" |
    "ProductImagesPostBody" |
    "ItemImagesPostBody"
  >]: RequestOptions;
}

const options: RemoveMapOptions = {
  "Zone":           { path: "zones/{{id}}",           type: "Zones" },
  "Aisle":          { path: "aisles/{{id}}",          type: "Aisles" },
  "Rack":           { path: "racks/{{id}}",           type: "Racks" },
  "Shelf":          { path: "shelfs/{{id}}",          type: "Shelfs" },
  "Category":       { path: "catories/{{id}}",        type: "Categories" },
  "Subcategory":    { path: "subcategory/{{id}}",     type: "Subcategories" },
  "Supplier":       { path: "suppliers/{{id}}",       type: "Suppliers" },
  "SupplierCode":   { path: "supplier-codes/{{id}}",  type: "SupplierCodes" },
  "Item":           { path: "items/{{id}}",           type: "Items" },
  "ItemImage":      { path: "item-images/{{id}}",     type: "ItemImages" },
  "Operation":    { path: "operations/{{id}}",      type: "Operations" },
  "Variant":        { path: "variants/{{id}}",        type: "Variants" },
  "Ticket":         { path: "tickets/{{id}}",         type: "Tickets" },
  "TicketType":     { path: "ticket-types/{{id}}",    type: "TicketTypes" },
  "TicketState":    { path: "aisles-states/{{id}}",   type: "TicketStates" },
  "Product":        { path: "products/{{id}}",        type: "Products" },
  "ProductImage":   { path: "product-images/{{id}}",  type: "ProductImages" },
  "Client":         { path: "clients/{{id}}",         type: "Clients" },
  "User":           { path: "users/{{id}}",           type: "Users" },
}

export async function remove<T extends keyof RemoveMapOptions>(
  request: T,
  id: string,
) {
  const option = options[request];

  const before = await fetchData<TypeMap[T]>({
    path: option.path.replace(/{{id}}/g, id),
    method: "GET",
    tag: revalidateTags[option.type],
  })

  const response = await fetchData<undefined>({
    path: option.path.replace(/{{id}}/g, id),
    method: "DELETE",
    tag: revalidateTags[option.type],
  });

  const streamedChange: ServerSentEventData = {
    id: id,
    type: request,
    action: "remove",
    before: before.data,
    after: null,
  };
  stringEmitter.emit('message', streamedChange);

  return response
}
