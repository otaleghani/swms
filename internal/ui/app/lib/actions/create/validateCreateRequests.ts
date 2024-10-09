"use server";

import { FormMap, FormState } from "../../types/form/form";
import validateResponse from "../../validation/response";
import { create } from "../../requests/generics/create";
import { createInBulk } from "../../requests/generics/createInBulk";
import { Zone, ZonesBulkPostRequestBody } from "../../types/data/zones";
import { Aisle, AislesBulkPostRequestBody } from "../../types/data/aisles";
import { Rack, RacksBulkPostRequestBody } from "../../types/data/racks";
import { Shelf, ShelfsBulkPostRequestBody } from "../../types/data/shelfs";
import { Item, ItemWithDefaultVariantAndImages } from "../../types/data/items";
import { ItemImagesPostBody, ProductImagesPostBody } from "../../types/data/images";
import { Variant, Variants } from "../../types/data/variants";
import { SupplierCodes } from "../../types/data/supplierCodes";
import { remove } from "../../requests/generics/remove";
import { Category } from "../../types/data/categories";
import { Subcategory } from "../../types/data/subcategories";
import { Product, ProductWithImages } from "../../types/data/products";

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

export async function validateCreateRequests<K extends keyof FormMap>(
  state: FormState<K>,
  type: string,
  locale: string,
) {
  let result;
  let response;

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
