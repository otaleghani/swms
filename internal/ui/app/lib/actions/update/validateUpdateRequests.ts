"use server";

import { FormMap, FormState } from "../../types/form/form";

import { updateZone } from "./data/zones";
import { updateAisle } from "./data/aisles";
import { updateRack } from "./data/racks";
import { updateShelf } from "./data/shelfs";
import { updateItem } from "./data/items";
import { updateVariant } from "./data/variants";
import { updateCategory } from "./data/categories";
import { updateSubcategory } from "./data/subcategories";
import { updateProduct } from "./data/products";
import { updateClient } from "./data/clients";
import { updateSupplier } from "./data/suppliers";
import { updateSupplierCode } from "./data/supplierCodes";
import { updateTicket } from "./data/tickets";
import { updateTicketType } from "./data/ticketTypes";
import { updateTicketState } from "./data/ticketStates";
import { updateOperation } from "./data/operations";
import { updateUser } from "./data/users";

export async function validateUpdateRequests<K extends keyof FormMap>(
  state: FormState<K>,
  type: string,
  locale: string,
) {
  let result;

  switch (type) {
    case "Zone":
      result = await updateZone(state, locale)
      break;

    case "Aisle":
      result = await updateAisle(state, locale)
      break;

    case "Rack":
      result = await updateRack(state, locale)
      break;

    case "Shelf":
      result = await updateShelf(state, locale)
      break;

    case "Item":
      result = await updateItem(state, locale)
      break;

    case "Variant":
      result = await updateVariant(state, locale)
      break;

    case "Category":
      result = await updateCategory(state, locale)
      break;

    case "Subcategory":
      result = await updateSubcategory(state, locale)
      break;

    case "Product":
      result = await updateProduct(state, locale)
      break;

    case "Client":
      result = await updateClient(state, locale)
      break;

    case "Supplier":
      result = await updateSupplier(state, locale)
      break;

    case "SupplierCode":
      result = await updateSupplierCode(state, locale)
      break;

    case "Ticket":
      result = await updateTicket(state, locale)
      break;
    
    case "TicketType":
      result = await updateTicketType(state, locale)
      break;

    case "TicketState":
      result = await updateTicketState(state, locale)
      break;

    case "Operation":
      result = await updateOperation(state, locale)
      break;

    case "User":
      result = await updateUser(state, locale)
      break;

    default: 
      result = state;
      result.error = true;
      result.message = "Oh-oh. This one is a doozy. Open an issue on github with the steps to replicate this message. Thank you!"
  }

  return result;
}
