"use server";

import { FormMap, FormState } from "../types/form/form";
import { validateAisle, validateAislesBulk } from "../validation/data/aisles";
import { validateItemImage } from "../validation/data/itemImages";
import { validateItem, validateItemComplete } from "../validation/data/items";
import { validateRack, validateRacksBulk } from "../validation/data/racks";
import { validateShelf, validateShelfsBulk } from "../validation/data/shelfs";
import { validateZone, validateZonesBulk } from "../validation/data/zones";

type ValidationsMap = {
  [K in keyof FormMap]: (state: FormState<K>, locale: string) => Promise<FormState<K>>;
}

const validations: ValidationsMap = {
  Zone: validateZone,
  Aisle: validateAisle,
  Rack: validateRack,
  Shelf: validateShelf,
  ZonesBulk: validateZonesBulk,
  AislesBulk: validateAislesBulk,
  RacksBulk: validateRacksBulk,
  ShelfsBulk: validateShelfsBulk,
  ItemComplete: validateItemComplete,
  ItemImage: validateItemImage,

}



export async function createFormAction<K extends keyof FormMap>(
  currentState: FormState<K>, 
  formData: FormData,
) {
  let state = currentState;
  let result = state.result ? state.result : {} as FormMap[K];
  let locale = formData.get("locale");
  let type = formData.get("type");

  formData.forEach((value, key) => {
    if (key in result) {
      const currentValue = (result as any)[key];
      if (typeof currentValue === 'number') {
        (result as any)[key] = Number(value);
      } else if (typeof currentValue === 'boolean') {
        (result as any)[key] = value === 'true' || value === 'on';
      } else {
        (result as any)[key] = value;
      }
    }
  });

  state.result = result;

  let stateVal;
  switch (type) {
    case "Zone":
      stateVal = validations.Zone(state as FormState<"Zone">, locale as string);
    case "Aisle":

  }

  

  //let fieldValidation = await validateAisle(state, locale as string)
  //let fieldValidation = await validationList[K](state, locale as string)
  //if (fieldValidation.error) {
  //  return fieldValidation as any;
  //}

  return state;
}
