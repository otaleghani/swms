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

type RetrieveByIdMapOptions = {
  [K in keyof TypeMapFilterSingles]: RequestOptions;
}

const options: RetrieveByIdMapOptions = {
  "Zone":           { path: "zones/",       type: "Zones" },
  "ZoneWithExtra":  { path: "zones/extra",  type: "ZonesWithExtra" },
  "Aisle":          { path: "aisles/",      type: "Aisles" },
  "AisleWithExtra": { path: "aisles/extra", type: "AisleWithExtra" },
  "Rack":           { path: "racks/",       type: "Racks" },
  "RackWithExtra":  { path: "racks/extra",  type: "RackWithExtra" },
  "Shelf":          { path: "shelfs/",      type: "Shelfs" },
  "ShelfWithExtra": { path: "shelfs/extra", type: "ShelfWithExtra" },
  "Category":       { path: "catories/",    type: "Category" },
  "Subcategory":    { path: "subcategory/", type: "Subcategory" },
  "Supplier": { 
    path: "suppliers/",       
    type: "SupplierWithExtra" 
  },
  "SupplierWithExtra":  { path: "suppliers/extra", type: "Supplier" },
  "SupplierCode":       { path: "supplier-codes/", type: "SupplierCode" },
  "SupplierCodeWithExtra": { 
    path: "supplier-codes/extra",  
    type: "SupplierCodeWithExtra" 
  },
  "Item":           { path: "items/",          type: "Item" },
  "ItemImage":      { path: "item-images/",    type: "ItemImage" },
  "Transition":     { path: "transition/",     type: "Transition" },
  "Variant":        { path: "variants/",       type: "Variant" },
  "Ticket":         { path: "tickets/",        type: "Ticket" },
  "TicketType":     { path: "ticket-types/",   type: "TicketType" },
  "TicketState":    { path: "aisles-states/",  type: "TicketState" },
  "Product":        { path: "products/",       type: "Product" },
  "ProductImage":   { path: "product-images/", type: "ProductImage" },
  "User":           { path: "users/",          type: "User" },
}

export async function retrieveById<T extends keyof RetrieveByIdMapOptions>(
  request: T,
  id: string,
) {
  const option = options[request];

  const response = await fetchData<TypeMap[T]>({
    path: option.path.replace(/{{id}}/g, id),
    method: "GET",
    tag: revalidateTags[option.type],
  })
  return response
}
