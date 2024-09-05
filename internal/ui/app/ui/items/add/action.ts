"use server";

// 1. Add new item
// 2. Add new images
// 3. Add new variants

import { getDictionary, Locale } from "@/lib/dictionaries";
import { Variant, Item, MediaPost } from "@/app/lib/types";
import validateString from "../../general/form/validation/strings";
import validateNumbers from "../../general/form/validation/number";
import validateDatabase from "../../general/form/validation/database";
import validateImages from "../../general/form/validation/images";
import validateResponse from "../../general/form/validation/request";
import { postItem } from "@/app/lib/requests/items/post";
import { postVariant } from "@/app/lib/requests/variants/post";
import { postImages } from "@/app/lib/requests/images/post";
// import validateItem from "../../general/form/validation/items";

export type AddItemFormState = {
  error: true | false;
  errorMessages: {
    // Item fields
    name: string[];
    description: string[];
    category: string[];
    subcategory: string[];
    zone: string[];
    aisle: string[];
    rack: string[];
    shelf: string[];

    // Default variant
    // No name, description and id because they will all be "default"
    quantity: string[];
    width: string[];
    height: string[];
    length: string[];
    weight: string[];

    // Images
    images: string[];

    // Here we have the JSON of the different variants
    variants: string[];
  };
  message?: string;
  result?: Item;
}; 

export async function AddItemFormAction(
  currentState: AddItemFormState, formData: FormData) {
  const state: AddItemFormState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      category: [],
      subcategory: [],
      zone: [],
      aisle: [],
      rack: [],
      shelf: [],
      quantity: [],
      width: [],
      height: [],
      length: [],
      weight: [],
      images: [],
      variants: [],
    },
    message: "",
  }

  /** Parsing data from form */
  const locale = formData.get("locale") as string;
  const itemData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    archive: false,
    category: formData.get("category") as string,
    subcategory: formData.get("subcategory") as string,
    zone: formData.get("zone") as string,
    aisle: formData.get("aisle") as string,
    rack: formData.get("rack") as string,
    shelf: formData.get("shelf") as string,
  }
  const dVariantData = {
    name: "default",
    description: "default",
    defaultVariant: true,
    quantity: formData.get("quantity") as string,
    width: formData.get("width") as string,
    height: formData.get("height") as string,
    length: formData.get("length") as string,
    weight: formData.get("weight") as string,
    item: "",
  }
  const variantsData = formData.get("variants") as string;
  const images = formData.getAll("images") as File[];

  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  /** Item validation */
  (state.errorMessages.name = validateString(
    itemData.name, 
    dict.forms.fields.name.validation, 2, 20
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.description = validateString(
    itemData.description, 
    dict.forms.fields.description.validation, 2, 20
  )).length != 0 ? (state.error = true) : (state.error = false);

  // Database validation
  if (itemData.category != "") {
    const errors = await validateDatabase({
      collection: "categories",
      id: itemData.category,
      dict: dict.forms.fields.categories.validation,
    });
    if (errors.length != 0) {
      state.error = true;
      state.errorMessages.category = errors;
    }
  }
  if (itemData.subcategory != "") {
    const errors = await validateDatabase({
      collection: "subcategories",
      id: itemData.subcategory,
      dict: dict.forms.fields.subcategories.validation,
    });
    if (errors.length != 0) {
      state.error = true;
      state.errorMessages.subcategory = errors;
    }
  }
  if (itemData.zone != "") {
    const errors = await validateDatabase({
      collection: "zones",
      id: itemData.zone,
      dict: dict.forms.fields.zones.validation,
    });
    if (errors.length != 0) {
      state.error = true;
      state.errorMessages.zone = errors;
    }
  }
  if (itemData.aisle != "") {
    const errors = await validateDatabase({
      collection: "aisles",
      id: itemData.aisle,
      dict: dict.forms.fields.aisle.validation,
    });
    if (errors.length != 0) {
      state.error = true;
      state.errorMessages.aisle = errors;
    }
  }
  if (itemData.rack != "") {
    const errors = await validateDatabase({
      collection: "racks",
      id: itemData.rack,
      dict: dict.forms.fields.rack.validation,
    });
    if (errors.length != 0) {
      state.error = true;
      state.errorMessages.rack = errors;
    }
  }
  if (itemData.shelf != "") {
    const errors = await validateDatabase({
      collection: "shelfs",
      id: itemData.shelf,
      dict: dict.forms.fields.shelf.validation,
    });
    if (errors.length != 0) {
      state.error = true;
      state.errorMessages.shelf = errors;
    }
  }

  /** Default variant validation */
  (state.errorMessages.quantity = validateNumbers(
    dVariantData.quantity, 
    dict.forms.fields.quantity.validation, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.width = validateNumbers(
    dVariantData.width, 
    dict.forms.fields.width.validation, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.height = validateNumbers(
    dVariantData.height, 
    dict.forms.fields.height.validation, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.length = validateNumbers(
    dVariantData.length, 
    dict.forms.fields.length.validation, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.weight = validateNumbers(
    dVariantData.weight, 
    dict.forms.fields.weight.validation, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  /** Variant validation */
  let encodedVariants: Variant[] = [];
  try {
    const variants: Variant[] = JSON.parse(variantsData);

    for (let i = 0; i < variants.length; i++) {
      (state.errorMessages.variants = validateString(
        variants[i].name,
        dict.forms.fields.name.validation, 2, 20
      )).length != 0 ? (state.error = true) : (state.error = false);

      (state.errorMessages.variants = validateString(
        variants[i].identifier,
        dict.forms.fields.identifier.validation, 2, 20
      )).length != 0 ? (state.error = true) : (state.error = false);

      (state.errorMessages.variants = validateString(
        variants[i].description,
        dict.forms.fields.description.validation, 2, 20
      )).length != 0 ? (state.error = true) : (state.error = false);

      (state.errorMessages.variants = validateNumbers(
        String(variants[i].quantity),
        dict.forms.fields.quantity.validation, -1, 9999999
      )).length != 0 ? (state.error = true) : (state.error = false);

      (state.errorMessages.variants = validateNumbers(
        String(variants[i].width),
        dict.forms.fields.width.validation, -1, 9999999
      )).length != 0 ? (state.error = true) : (state.error = false);

      (state.errorMessages.variants = validateNumbers(
        String(variants[i].heigth),
        dict.forms.fields.height.validation, -1, 9999999
      )).length != 0 ? (state.error = true) : (state.error = false);

      (state.errorMessages.variants = validateNumbers(
        String(variants[i].length),
        dict.forms.fields.length.validation, -1, 9999999
      )).length != 0 ? (state.error = true) : (state.error = false);

      (state.errorMessages.variants = validateNumbers(
        String(variants[i].weight),
        dict.forms.fields.weight.validation, -1, 9999999
      )).length != 0 ? (state.error = true) : (state.error = false);
    }
    encodedVariants = variants;
  } catch(err) {
    state.error = true;
    state.errorMessages.variants.push(dict.fields.variants.validation.general);
  }
  

  /** Images validation */
  let encodedImages: string[] = [];
  if (images.length != 0) {
    const imagesResult = await validateImages(images);

    if (imagesResult.errors.length != 0) {
      state.error = true;
      state.errorMessages.images = imagesResult.errors;
    }
    encodedImages = imagesResult.images;
  }

  if (state.error) {
    state.message = dict.forms.messages.errors.general;
    return state;
  }

  /** Post item */
  const item: Item = {
    name: itemData.name,
    description: itemData.description,
    archive: itemData.archive,
    zone: itemData.zone,
    aisle: itemData.aisle,
    rack: itemData.rack,
    shelf: itemData.shelf,
    category: itemData.category,
    subcategory: itemData.subcategory,
  }
  const resultAddItem = await postItem(item)
  const validation = validateResponse({
    dict: dict.forms.messages, 
    response: resultAddItem
  });
  if (!validation.error) {
    state.error = true;
    state.message = validation.message;
    return state;
  }
  
  /** Post variants */
  for (let i = 0; i < encodedVariants.length; i++) {
    encodedVariants[i].item = resultAddItem.UUID;
    const resultAddVariant = await postVariant(encodedVariants[i]);
    const validation = validateResponse({
      dict: dict.forms.messages,
      response: resultAddVariant,
    });
    if (!validation.error) {
      state.error = true;
      state.message = validation.message;
      
      // here I should delete the early created item
    }
  }

  /** Post images */
  for (let i = 0; i < encodedImages.length; i++) {
    const mediaPost: MediaPost = {
      item: resultAddItem.UUID,
      blob: encodedImages[i]
    }
    const resultAddImage = await postImages(mediaPost);
    const validation = validateResponse({
      dict: dict.forms.messages,
      response: resultAddImage,
    });
    if (!validation.error) {
      state.error = true;
      state.message = validation.message;

      // Here I should clean up the item and its variants
    }
  }

  item.id = resultAddItem.UUID;
  state.result = item;
  state.message = dict.forms.messages.success.post;
  return state;
}
