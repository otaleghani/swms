"use server";

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
    "SupplierCodeWithExtra"
  >]: RequestOptions;
}

const options: RemoveMapOptions = {
  "Zone":           { path: "zones/",           type: "Zones" },
  "Aisle":          { path: "aisles/",          type: "Aisles" },
  "Rack":           { path: "racks/",           type: "Racks" },
  "Shelf":          { path: "shelfs/",          type: "Shelfs" },
  "Category":       { path: "catories/",        type: "Category" },
  "Subcategory":    { path: "subcategory/",     type: "Subcategory" },
  "Supplier":       { path: "suppliers/",       type: "Supplier" },
  "SupplierCode":   { path: "supplier-codes/",  type: "SupplierCode" },
  "Item":           { path: "items/",           type: "Item" },
  "ItemImage":      { path: "item-images/",     type: "ItemImage" },
  "Transition":     { path: "transition/",      type: "Transition" },
  "Variant":        { path: "variants/",        type: "Variant" },
  "Ticket":         { path: "tickets/",         type: "Ticket" },
  "TicketType":     { path: "ticket-types/",    type: "TicketType" },
  "TicketState":    { path: "aisles-states/",   type: "TicketState" },
  "Product":        { path: "products/",        type: "Product" },
  "ProductImage":   { path: "product-images/",  type: "ProductImage" },
  "User":           { path: "users/",           type: "User" },
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
  })
  return response
}
