"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import { remove } from "@/app/lib/requests/generics/remove";
import validateResponse from "@/app/lib/validation/response";
import { Item, ItemWithDefaultVariantAndImages } from "@/app/lib/types/data/items";
import { Variant, Variants } from "@/app/lib/types/data/variants";
import { SupplierCodes } from "@/app/lib/types/data/supplierCodes";
import { ItemImagesPostBody } from "@/app/lib/types/data/images";

export async function createItem<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create("Item", state.result as Item);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Item">, 
    locale as string
  );

  return stateValidation;
}

export async function createItemComplete<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){ 
  const resultItemComplete = state.result as CompleteItem;
  type CompleteItem = ItemWithDefaultVariantAndImages;

  // Creates the item, waits for the id
  // RB = RequestBody
  // r = response
  const itemRB: Item = resultItemComplete;
  let rItem = await create("Item", itemRB);
  let stateValidation = await validateResponse(rItem, state, locale);
  if (stateValidation.error === true || rItem.data?.uuid === undefined) {
    return stateValidation
  }
  const itemUUID = rItem.data.uuid;
  
  // Creates the default Variant with the item id
  const defaultVariantRB: Variant = resultItemComplete;
  defaultVariantRB.item = itemUUID;

  let rDefaultVariant = await create("Variant", defaultVariantRB);
  stateValidation = await validateResponse(rDefaultVariant, state, locale);
  if (stateValidation.error === true || rDefaultVariant.data?.uuid === undefined) {
    remove("Item", itemUUID);
    return stateValidation
  }
  const defaultVariantUUID = rDefaultVariant.data.uuid;

  // Creates the images request
  const imagesRB: ItemImagesPostBody = {
    item: itemUUID,
    //images: resultItemComplete.images,
    encodedImages: resultItemComplete.encodedImages,
  }
  let rImages = await create("ItemImagesPostBody", imagesRB);
  stateValidation = await validateResponse(rImages, state, locale);
  if (stateValidation.error === true || 
      rDefaultVariant.data?.uuid === undefined) {
    remove("Item", itemUUID);
    remove("Variant", defaultVariantUUID);
    return stateValidation
  }

  // We take the variants json, parse it and then add the item UUID on top
  const variantsRaw: Variants = JSON.parse(resultItemComplete.variantsJSON);
  const variants = variantsRaw.map(variant => ({...variant, item: itemUUID}));

  // same thing for the codes
  const codesRaw: SupplierCodes = JSON.parse(resultItemComplete.codesJSON);
  const codes = codesRaw.map(code => ({...code, item: itemUUID}));

  let variantsUUID: string[] = [];
  let codesUUID: string[] = [];

  for (let i = 0; i < variants.length; i++) {
    let rVariant = await create("Variant", variants[i]);
    stateValidation = await validateResponse(rVariant, state, locale);
    if (stateValidation.error === true ||
        rVariant.data?.uuid === undefined) {
        remove("Item", itemUUID);
        remove("Variant", defaultVariantUUID);
        for (let j = 0; j < variantsUUID.length; j++) {
          remove("Variant", variantsUUID[j]);
        }
        return stateValidation
    }
    variantsUUID.push(rVariant.data.uuid)
    const currentUUID = rVariant.data.uuid;

    // Here we do the same that we did for item uuid, but for the current variant
    const codesToPostRaw: SupplierCodes = codes.filter(
      code => code.variant = variants[i].id as string
    );
    const codesToPost: SupplierCodes = codesToPostRaw.map(
      code => ({...code, variant: currentUUID as string})
    );

    for (let k = 0; k < codesToPost.length; k++) {
      let rCode = await create("SupplierCode", codesToPost[k]);
      stateValidation = await validateResponse(rCode, state, locale);
      if (stateValidation.error === true ||
          rCode.data?.uuid === undefined) {
          remove("Item", itemUUID);
          remove("Variant", defaultVariantUUID);
          for (let j = 0; j < variantsUUID.length; j++) {
            remove("Variant", variantsUUID[j]);
          }
          for (let j = 0; j < codesUUID.length; j++) {
            remove("SupplierCode", codesUUID[j]);
          }
          return stateValidation
      }
      codesUUID.push(rCode.data.uuid)
    }
  }
  return stateValidation;
}

