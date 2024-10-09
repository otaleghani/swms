"use server";

import { FormMap, FormState } from "../../types/form/form";

import { createZone, createZonesBulk } from "./data/zones";
import { createAisle, createAislesBulk } from "./data/aisles";
import { createRack, createRacksBulk } from "./data/racks";
import { createShelf, createShelfsBulk } from "./data/shelfs";
import { createItem, createItemComplete } from "./data/items";
import { createVariant } from "./data/variants";
import { createItemImages } from "./data/itemImages";
import { createCategory } from "./data/categories";
import { createSubcategory } from "./data/subcategories";
import { createProduct, createProductWithImages } from "./data/products";
import { createProductImages } from "./data/productImages";
import { createClient } from "./data/clients";
import { createSupplier } from "./data/suppliers";
import { createSupplierCode } from "./data/supplierCodes";
import { createTicket } from "./data/tickets";
import { createTicketType } from "./data/ticketTypes";
import { createTicketState } from "./data/ticketStates";
import { createTransaction } from "./data/transactions";
import { createUser } from "./data/users";

export async function validateCreateRequests<K extends keyof FormMap>(
  state: FormState<K>,
  type: string,
  locale: string,
) {
  let result;

  switch (type) {
    case "Zone":
      result = await createZone(state, locale)

    case "Aisle":
      result = await createAisle(state, locale)

    case "Rack":
      result = await createRack(state, locale)

    case "Shelf":
      result = await createShelf(state, locale)

    case "ZonesBulk":
      result = await createZonesBulk(state, locale)

    case "AislesBulk":
      result = await createAislesBulk(state, locale)

    case "RacksBulk":
      result = await createRacksBulk(state, locale)

    case "ShelfsBulk":
      result = await createShelfsBulk(state, locale)

    case "Item":
      result = await createItem(state, locale)

    case "Variant":
      result = await createVariant(state, locale)

    case "ItemImage":
      result = await createItemImages(state, locale)

    case "ItemComplete":
      result = await createItemComplete(state, locale)

    case "Category":
      result = await createCategory(state, locale)

    case "Subcategory":
      result = await createSubcategory(state, locale)

    case "Product":
      result = await createProduct(state, locale)

    case "ProductWithImages":
      result = await createProductWithImages(state, locale)

    case "ProductImage":
      result = await createProductImages(state, locale)

    case "Client":
      result = await createClient(state, locale)

    case "Supplier":
      result = await createSupplier(state, locale)

    case "SupplierCode":
      result = await createSupplierCode(state, locale)

    case "Ticket":
      result = await createTicket(state, locale)
    
    case "TicketType":
      result = await createTicketType(state, locale)

    case "TicketState":
      result = await createTicketState(state, locale)

    case "Transaction":
      result = await createTransaction(state, locale)

    case "User":
      result = await createUser(state, locale)

    default: 
      result = state;
      result.error = true;
      result.message = "Oh-oh. This one is a doozy. Open an issue on github with the steps to replicate this message. Thank you!"
  }

  return result;
}
