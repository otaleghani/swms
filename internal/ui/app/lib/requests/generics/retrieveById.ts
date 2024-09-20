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
  "Zone":           { path: "zones/{{id}}",       type: "Zones" },
  "ZoneWithExtra":  { path: "zones/{{id}}/extra",  type: "ZonesWithExtra" },
  "Aisle":          { path: "aisles/{{id}}",      type: "Aisles" },
  "AisleWithExtra": { path: "aisles/{{id}}/extra", type: "AisleWithExtra" },
  "Rack":           { path: "racks/{{id}}",       type: "Racks" },
  "RackWithExtra":  { path: "racks/{{id}}/extra",  type: "RackWithExtra" },
  "Shelf":          { path: "shelfs/{{id}}",      type: "Shelfs" },
  "ShelfWithExtra": { path: "shelfs/{{id}}/extra", type: "ShelfWithExtra" },
  "Category":       { path: "catories/{{id}}",    type: "Category" },
  "Subcategory":    { path: "subcategory/{{id}}", type: "Subcategory" },
  "Supplier": { 
    path: "suppliers/{{id}}",       
    type: "SupplierWithExtra" 
  },
  "SupplierWithExtra":  { path: "suppliers/{{id}}/extra", type: "Supplier" },
  "SupplierCode":       { path: "supplier-codes/{{id}}", type: "SupplierCode" },
  "SupplierCodeWithExtra": { 
    path: "supplier-codes/{{id}}/extra",  
    type: "SupplierCodeWithExtra" 
  },
  "Item":           { path: "items/{{id}}",          type: "Item" },
  "ItemImage":      { path: "item-images/{{id}}",    type: "ItemImage" },
  "Transaction":    { path: "transition/{{id}}",     type: "Transaction" },
  "Variant":        { path: "variants/{{id}}",       type: "Variant" },
  "Ticket":         { path: "tickets/{{id}}",        type: "Ticket" },
  "TicketType":     { path: "ticket-types/{{id}}",   type: "TicketType" },
  "TicketState":    { path: "aisles-states/{{id}}",  type: "TicketState" },
  "Product":        { path: "products/{{id}}",       type: "Product" },
  "ProductImage":   { path: "product-images/{{id}}", type: "ProductImage" },
  "Client":         { path: "clients/{{id}}",         type: "Client" },
  "User":           { path: "users/{{id}}",          type: "User" },
}

export async function retrieveById<T extends keyof RetrieveByIdMapOptions>(
  request: T,
  id: string,
) {
  const option = options[request];

  const response = await fetchData<TypeMap[T]>({
    path: option.path.replace(/{{id}}{{id}}/g, id),
    method: "GET",
    tag: revalidateTags[option.type],
  })
  return response
}
