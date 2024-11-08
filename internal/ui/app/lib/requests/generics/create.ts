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
    "CategoryWithExtra" |
    "SubcategoryWithExtra" |
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
  "Category":       { path: "categories/",        type: "Categories" },
  "Subcategory":    { path: "subcategories/",     type: "Subcategories" },
  "Supplier":       { path: "suppliers/",       type: "Suppliers" },
  "SupplierCode":   { path: "supplier-codes/",  type: "SupplierCodes" },
  "Item":           { path: "items/",           type: "Items" },
  "ItemImagesPostBody":      { path: "item-images/",     type: "ItemImagesPostBody" },
  "Operation":    { path: "operations/",      type: "Operations" },
  "Variant":        { path: "variants/",        type: "Variants" },
  "Ticket":         { path: "tickets/",         type: "Tickets" },
  "TicketType":     { path: "ticket-types/",    type: "TicketTypes" },
  "TicketState":    { path: "aisles-states/",   type: "TicketStates" },
  "Product":        { path: "products/",        type: "Products" },
  "ProductImagesPostBody":   { path: "product-images/",  type: "ProductImagesPostBody" },
  "Client":         { path: "clients/",         type: "Clients" },
  "User":           { path: "users/",           type: "Users" },
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
    before: "",
    after: payload,
  };
  stringEmitter.emit('message', streamedChange);

  return response
}
