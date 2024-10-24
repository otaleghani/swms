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
import { createOperation } from "./data/operations";
import { createUser } from "./data/users";

export async function validateCreateRequests<K extends keyof FormMap>(
  state: FormState<K>,
  type: string,
  locale: string,
) {
  let result;

  switch (type) {
    case "Zone":
      result = await createZone(state, locale);
      break;

    case "Aisle":
      result = await createAisle(state, locale);
      break;

    case "Rack":
      result = await createRack(state, locale);
      break;

    case "Shelf":
      result = await createShelf(state, locale);
      break;

    case "ZonesBulk":
      result = await createZonesBulk(state, locale);
      break;

    case "AislesBulk":
      result = await createAislesBulk(state, locale);
      break;

    case "RacksBulk":
      result = await createRacksBulk(state, locale);
      break;

    case "ShelfsBulk":
      result = await createShelfsBulk(state, locale);
      break;

    case "Item":
      result = await createItem(state, locale);
      break;

    case "Variant":
      result = await createVariant(state, locale);
      break;

    case "ItemImage":
      result = await createItemImages(state, locale);
      break;

    case "ItemComplete":
      result = await createItemComplete(state, locale);
      break;

    case "Category":
      result = await createCategory(state, locale);
      break;

    case "Subcategory":
      result = await createSubcategory(state, locale);
      break;

    case "Product":
      result = await createProduct(state, locale);
      break;

    case "ProductWithImages":
      result = await createProductWithImages(state, locale);
      break;

    case "ProductImage":
      result = await createProductImages(state, locale);
      break;

    case "Client":
      result = await createClient(state, locale);
      break;

    case "Supplier":
      result = await createSupplier(state, locale);
      break;

    case "SupplierCode":
      result = await createSupplierCode(state, locale);
      break;

    case "Ticket":
      result = await createTicket(state, locale);
      break;
    
    case "TicketType":
      result = await createTicketType(state, locale);
      break;

    case "TicketState":
      result = await createTicketState(state, locale);
      break;

    case "Operation":
      result = await createOperation(state, locale);
      break;

    case "User":
      result = await createUser(state, locale);
      break;

    default: 
      result = state;
      result.error = true;
      result.message = "Oh-oh. This one is a doozy. Open an issue on github with the steps to replicate this message. Thank you!"
  }

  return result;
}
