"use server";

/** Actions */
import fetchData from "../fetch";

/** Consts */
import { revalidateTags } from "../tags";

/** Types and interfaces*/
import { 
  RequestOptions, 
  TypeMap,
  TypeMapFilterLists,
} from "../../types/requests";

type RetrieveMapOptions = {
  [K in keyof TypeMapFilterLists]: RequestOptions;
}

const options: RetrieveMapOptions = {
  "Zones":                  { path: "zones/",               type: "Zones" },
  "ZonesWithExtra":         { path: "zones/extra",          type: "Zones" },
  "Aisles":                 { path: "aisles/",              type: "Aisles" },
  "AislesWithExtra":        { path: "aisles/extra",         type: "Aisles" },
  "Racks":                  { path: "racks/",               type: "Racks" },
  "RacksWithExtra":         { path: "racks/extra",          type: "Racks" },
  "Shelfs":                 { path: "shelfs/",              type: "Shelfs" },
  "ShelfsWithExtra":        { path: "shelfs/extra",         type: "Shelfs" },
  "Categories":             { path: "categories/",          type: "Categories" },
  "Subcategories":          { path: "subcategories/",       type: "Subcategories" },
  "Suppliers":              { path: "suppliers/",           type: "Suppliers" },
  "SuppliersWithExtra":     { path: "suppliers/extra",      type: "Suppliers" },
  "SupplierCodes":          { path: "supplier-codes/",      type: "SupplierCodes" },
  "SupplierCodesWithExtra": { path: "supplier-codes/extra", type: "SupplierCodes" },
  "ItemWithSupplierCodes":  { path: "items/supplier-codes", type: "SupplierCodes" },
  "Items":                  { path: "items/",               type: "Items" },
  "ItemImages":             { path: "item-images/",         type: "ItemImage" },
  "Transactions":           { path: "transitions/",         type: "Transactions" },
  "Variants":               { path: "variants/",            type: "Variants" },
  "Tickets":                { path: "tickets/",             type: "Tickets" },
  "TicketTypes":            { path: "ticket-types/",        type: "TicketTypes" },
  "TicketStates":           { path: "ticket-states/",       type: "TicketStates" },
  "Products":               { path: "products/",            type: "Products" },
  "ProductImages":          { path: "product-images/",      type: "ProductImage" },
  "Clients":                { path: "clients/",             type: "Clients" },
  "Users":                  { path: "users/",               type: "Users" },
};


export async function retrieve<T extends keyof RetrieveMapOptions>(
  request: T,
) {
  const option = options[request];

  const response = await fetchData<TypeMap[T]>({
    path: option.path,
    method: "GET",
    tag: revalidateTags[option.type],
  })

  return response
}
