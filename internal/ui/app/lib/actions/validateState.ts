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
import { validateTransaction } from "../validation/data/transactions";
import { validateUser } from "../validation/data/users";
import { validateZone, validateZonesBulk } from "../validation/data/zones";

/** Types and interfaces */
import { FormMap, FormState } from "../types/form/form";
import { validateDelete } from "../validation/delete";

type ValidationsMap = {
  [K in keyof Omit<FormMap, "Replace">]: (
    state: FormState<K>,
    locale: string
  ) => Promise<FormState<K>>;
};

const validations: ValidationsMap = {
  Delete: validateDelete,
  Zone: validateZone,
  Aisle: validateAisle,
  Rack: validateRack,
  Shelf: validateShelf,
  ZonesBulk: validateZonesBulk,
  AislesBulk: validateAislesBulk,
  RacksBulk: validateRacksBulk,
  ShelfsBulk: validateShelfsBulk,
  Item: validateItem,
  Variant: validateVariant,
  ItemImage: validateItemImage,
  ItemComplete: validateItemComplete,
  Category: validateCategory,
  Subcategory: validateSubcategory,
  Product: validateProduct,
  ProductWithImages: validateProductWithImages,
  ProductImage: validateProductImage,
  Client: validateClient,
  Supplier: validateSupplier,
  SupplierCode: validateSupplierCode,
  Ticket: validateTicket,
  TicketType: validateTicketType,
  TicketState: validateTicketState,
  Transaction: validateTransaction,
  User: validateUser,
};

export async function validateState<K extends keyof FormMap>(
  state: FormState<K>,
  type: string,
  locale: string,
) {
  let stateValidation;

  switch (type) {
    case "Delete":
      stateValidation = await validations.Delete(
        state as FormState<"Delete">, 
        locale as string
      );

    case "Zone":
      stateValidation = await validations.Zone(
        state as FormState<"Zone">, 
        locale as string
      );

    case "Aisle":
      stateValidation = await validations.Zone(
        state as FormState<"Aisle">, 
        locale as string
      );

    case "Rack":
      stateValidation = await validations.Rack(
        state as FormState<"Rack">,
        locale as string
      );
    case "Shelf":
      stateValidation = await validations.Shelf(
        state as FormState<"Shelf">,
        locale as string
      );
    case "ZonesBulk":
      stateValidation = await validations.ZonesBulk(
        state as FormState<"ZonesBulk">,
        locale as string
      );
    case "AislesBulk":
      stateValidation = await validations.AislesBulk(
        state as FormState<"AislesBulk">,
        locale as string
      );
    case "RacksBulk":
      stateValidation = await validations.RacksBulk(
        state as FormState<"RacksBulk">,
        locale as string
      );
    case "ShelfsBulk":
      stateValidation = await validations.ShelfsBulk(
        state as FormState<"ShelfsBulk">,
        locale as string
      );
    case "Item":
      stateValidation = await validations.Item(
        state as FormState<"Item">, 
        locale as string
      );
    case "Variant":
      stateValidation = await validations.Variant(
        state as FormState<"Variant">,
        locale as string
      );
    case "ItemImage":
      stateValidation = await validations.ItemImage(
        state as FormState<"ItemImage">,
        locale as string
      );
    case "ItemComplete":
      stateValidation = await validations.ItemComplete(
        state as FormState<"ItemComplete">,
        locale as string
      );
    case "Category":
      stateValidation = await validations.Category(
        state as FormState<"Category">,
        locale as string
      );
    case "Subcategory":
      stateValidation = await validations.Subcategory(
        state as FormState<"Subcategory">,
        locale as string
      );
    case "Product":
      stateValidation = await validations.Product(
        state as FormState<"Product">,
        locale as string
      );
    case "ProductWithImages":
      stateValidation = await validations.ProductWithImages(
        state as FormState<"ProductWithImages">,
        locale as string
      );
    case "ProductImage":
      stateValidation = await validations.ProductImage(
        state as FormState<"ProductImage">,
        locale as string
      );
    case "Client":
      stateValidation = await validations.Client(
        state as FormState<"Client">,
        locale as string
      );
    case "Supplier":
      stateValidation = await validations.Supplier(
        state as FormState<"Supplier">,
        locale as string
      );
    case "SupplierCode":
      stateValidation = await validations.SupplierCode(
        state as FormState<"SupplierCode">,
        locale as string
      );
    case "Ticket":
      stateValidation = await validations.Ticket(
        state as FormState<"Ticket">,
        locale as string
      );
    case "TicketType":
      stateValidation = await validations.TicketType(
        state as FormState<"TicketType">,
        locale as string
      );
    case "TicketState":
      stateValidation = await validations.TicketState(
        state as FormState<"TicketState">,
        locale as string
      );
    case "Transaction":
      stateValidation = await validations.Transaction(
        state as FormState<"Transaction">,
        locale as string
      );
    case "User":
      stateValidation = await validations.User(
        state as FormState<"User">, 
        locale as string
      );
    default: 
      stateValidation = state;
      state.error = true;
      state.message = "Oh-oh. This one is a doozy. Open an issue on github with the steps to replicate this message. Thank you!"
  }


  return stateValidation;
}
