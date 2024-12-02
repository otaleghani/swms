"use server";

/** Actions */
import { validateAisle, validateAislesBulk } from "../validation/data/aisles";
import { validateCategory } from "../validation/data/categories";
import { validateClient } from "../validation/data/clients";
import { validateItemImage } from "../validation/data/itemImages";
import { validateVariant } from "../validation/data/variants";
import { validateItem, validateItemComplete } from "../validation/data/items";
import { validateProductImage } from "../validation/data/productImages";
import { validateProduct, validateProductWithImages} from "../validation/data/products";
import { validateRack, validateRacksBulk } from "../validation/data/racks";
import { validateShelf, validateShelfsBulk } from "../validation/data/shelfs";
import { validateSubcategory } from "../validation/data/subcategories";
import { validateSupplierCode } from "../validation/data/supplierCodes";
import { validateSupplier } from "../validation/data/suppliers";
import { validateTicket } from "../validation/data/tickets";
import { validateTicketType } from "../validation/data/ticketTypes";
import { validateTicketState } from "../validation/data/ticketStates";
import { validateOperation } from "../validation/data/operations";
import { validateUser } from "../validation/data/users";
import { validateZone, validateZonesBulk } from "../validation/data/zones";

/** Types and interfaces */
import { FormMap, FormState } from "../types/form/form";
import { validateDelete } from "../validation/delete";
import { validateReplace } from "../validation/replace";
import { validateLogin } from "../validation/data/login";
import { validateRegister } from "../validation/data/register";

type ValidationsMap = {
  [K in keyof FormMap]: (
    state: FormState<K>,
    locale: string
  ) => Promise<FormState<K>>;
};

export async function validateState<K extends keyof FormMap>(
  state: FormState<K>,
  type: string,
  locale: string,
) {
  let stateValidation;

  switch (type) {
    case "Login":
      stateValidation = await validateLogin(
        state as FormState<"Login">, 
        locale as string
      );
      break;

    case "Register":
      stateValidation = await validateRegister(
        state as FormState<"Register">, 
        locale as string
      );
      break;

    case "Replace":
      stateValidation = await validateReplace(
        state as FormState<"Replace">, 
        locale as string
      );
      break;

    case "Delete":
      stateValidation = await validateDelete(
        state as FormState<"Delete">, 
        locale as string
      );
      break;

    case "Zone":
      stateValidation = await validateZone(
        state as FormState<"Zone">, 
        locale as string
      );
      break;

    case "Aisle":
      stateValidation = await validateAisle(
        state as FormState<"Aisle">, 
        locale as string
      );
      break;

    case "Rack":
      stateValidation = await validateRack(
        state as FormState<"Rack">,
        locale as string
      );
      break;

    case "Shelf":
      stateValidation = await validateShelf(
        state as FormState<"Shelf">,
        locale as string
      );
      break;

    case "ZonesBulk":
      stateValidation = await validateZonesBulk(
        state as FormState<"ZonesBulk">,
        locale as string
      );
      break;

    case "AislesBulk":
      stateValidation = await validateAislesBulk(
        state as FormState<"AislesBulk">,
        locale as string
      );
      break;

    case "RacksBulk":
      stateValidation = await validateRacksBulk(
        state as FormState<"RacksBulk">,
        locale as string
      );
      break;

    case "ShelfsBulk":
      stateValidation = await validateShelfsBulk(
        state as FormState<"ShelfsBulk">,
        locale as string
      );
      break;

    case "Item":
      stateValidation = await validateItem(
        state as FormState<"Item">, 
        locale as string
      );
      break;

    case "Variant":
      stateValidation = await validateVariant(
        state as FormState<"Variant">,
        locale as string
      );
      break;

    case "ItemImage":
      stateValidation = await validateItemImage(
        state as FormState<"ItemImage">,
        locale as string
      );
      break;

    case "ItemComplete":
      stateValidation = await validateItemComplete(
        state as FormState<"ItemComplete">,
        locale as string
      );
      break;

    case "Category":
      stateValidation = await validateCategory(
        state as FormState<"Category">,
        locale as string
      );
      break;

    case "Subcategory":
      stateValidation = await validateSubcategory(
        state as FormState<"Subcategory">,
        locale as string
      );
      break;

    case "Product":
      stateValidation = await validateProduct(
        state as FormState<"Product">,
        locale as string
      );
      break;

    case "ProductWithImages":
      stateValidation = await validateProductWithImages(
        state as FormState<"ProductWithImages">,
        locale as string
      );
      break;

    case "ProductImage":
      stateValidation = await validateProductImage(
        state as FormState<"ProductImage">,
        locale as string
      );
      break;

    case "Client":
      stateValidation = await validateClient(
        state as FormState<"Client">,
        locale as string
      );
      break;

    case "Supplier":
      stateValidation = await validateSupplier(
        state as FormState<"Supplier">,
        locale as string
      );
      break;

    case "SupplierCode":
      stateValidation = await validateSupplierCode(
        state as FormState<"SupplierCode">,
        locale as string
      );
      break;

    case "Ticket":
      stateValidation = await validateTicket(
        state as FormState<"Ticket">,
        locale as string
      );
      break;

    case "TicketType":
      stateValidation = await validateTicketType(
        state as FormState<"TicketType">,
        locale as string
      );
      break;

    case "TicketState":
      stateValidation = await validateTicketState(
        state as FormState<"TicketState">,
        locale as string
      );
      break;

    case "Operation":
      stateValidation = await validateOperation(
        state as FormState<"Operation">,
        locale as string
      );
      break;

    case "User":
      stateValidation = await validateUser(
        state as FormState<"User">, 
        locale as string
      );
      break;

    default: 
      stateValidation = state;
      state.error = true;
      state.message = "Oh-oh. This one is a doozy. Open an issue on github with the steps to replicate this message. Thank you!"
  }

  return stateValidation;
}
