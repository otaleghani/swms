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
import { ResponseDataPost } from "../../types/misc";

type CreateMapOptions = {
  [K in Exclude<keyof TypeMapFilterSingles, 
    "ZoneWithExtra" |
    "AisleWithExtra" |
    "RackWithExtra" |
    "ShelfWithExtra" |
    "SupplierWithExtra" |
    "SupplierCodeWithExtra" |
    "ItemImage" |
    "ProductImage"
  >]: RequestOptions;
}

const options: CreateMapOptions = {
  "Zone":           { path: "zones/",           type: "Zones" },
  "Aisle":          { path: "aisles/",          type: "Aisles" },
  "Rack":           { path: "racks/",           type: "Racks" },
  "Shelf":          { path: "shelfs/",          type: "Shelfs" },
  "Category":       { path: "catories/",        type: "Category" },
  "Subcategory":    { path: "subcategory/",     type: "Subcategory" },
  "Supplier":       { path: "suppliers/",       type: "Supplier" },
  "SupplierCode":   { path: "supplier-codes/",  type: "SupplierCode" },
  "Item":           { path: "items/",           type: "Item" },
  "ItemImagesPostBody":      { path: "item-images/",     type: "ItemImagesPostBody" },
  "Transaction":    { path: "transition/",      type: "Transaction" },
  "Variant":        { path: "variants/",        type: "Variant" },
  "Ticket":         { path: "tickets/",         type: "Ticket" },
  "TicketType":     { path: "ticket-types/",    type: "TicketType" },
  "TicketState":    { path: "aisles-states/",   type: "TicketState" },
  "Product":        { path: "products/",        type: "Product" },
  "ProductImagesPostBody":   { path: "product-images/",  type: "ProductImagesPostBody" },
  "Client":         { path: "clients/",         type: "Client" },
  "User":           { path: "users/",           type: "User" },
}

export async function create<T extends keyof CreateMapOptions>(
  request: T,
  payload: TypeMap[T],
) {
  const option = options[request];

  const response = await fetchData<ResponseDataPost>({
    path: option.path,
    method: "POST",
    tag: revalidateTags[option.type],
    payload: payload,
  })
  
  const streamedChange: ServerSentEventData = {
    id: response.data?.uuid ? response.data.uuid : "",
    type: request,
    action: "create",
    before: null,
    after: payload,
  };
  stringEmitter.emit('message', streamedChange);

  return response
}
