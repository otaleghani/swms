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
  "Category":       { path: "catories/{{id}}",        type: "Category" },
  "Subcategory":    { path: "subcategory/{{id}}",     type: "Subcategory" },
  "Supplier":       { path: "suppliers/{{id}}",       type: "Supplier" },
  "SupplierCode":   { path: "supplier-codes/{{id}}",  type: "SupplierCode" },
  "Item":           { path: "items/{{id}}",           type: "Item" },
  "ItemImage":      { path: "item-images/{{id}}",     type: "ItemImage" },
  "Transaction":    { path: "transition/{{id}}",      type: "Transaction" },
  "Variant":        { path: "variants/{{id}}",        type: "Variant" },
  "Ticket":         { path: "tickets/{{id}}",         type: "Ticket" },
  "TicketType":     { path: "ticket-types/{{id}}",    type: "TicketType" },
  "TicketState":    { path: "aisles-states/{{id}}",   type: "TicketState" },
  "Product":        { path: "products/{{id}}",        type: "Product" },
  "ProductImage":   { path: "product-images/{{id}}",  type: "ProductImage" },
  "Client":         { path: "clients/{{id}}",         type: "Client" },
  "User":           { path: "users/{{id}}",           type: "User" },
}

export async function remove<T extends keyof RemoveMapOptions>(
  request: T,
  id: string,
) {
  const option = options[request];

  const response = await fetchData<undefined>({
    path: option.path.replace(/{{id}}/g, id),
    method: "DELETE",
    tag: revalidateTags[option.type],
  });

  const streamedChange: ServerSentEventData = {
    id: id,
    type: request,
    action: "remove",
  };
  stringEmitter.emit('message', streamedChange);

  return response
}
