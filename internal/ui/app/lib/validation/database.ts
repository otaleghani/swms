"use server";

/** Actions */
import { retrieveById } from "../requests/generics/retrieveById";
import validateResponse from "./response";

/** Types and interfaces */
import { FormState, FormMap } from "../types/form/form";

export async function validateExisting<
  K extends Exclude<keyof FormMap,
    "ZonesBulk" |
    "AislesBulk" |
    "RacksBulk" |
    "ShelfsBulk" |
    "ItemComplete" |
    "ProductWithImages" |
    "Delete" |
    "Replace"
  >,
>(
  type: K,
  state: FormState<K>,
  uuid: string,
  locale: string,
) {
  const response = await retrieveById(type, uuid);
  const validation = await validateResponse(
    response,
    state,
    locale,
  );
  return validation;
}

export async function checkExisting<
  K extends Exclude<keyof FormMap,
    "ZonesBulk" |
    "AislesBulk" |
    "RacksBulk" |
    "ShelfsBulk" |
    "ItemComplete" |
    "ProductWithImages" |
    "Delete" |
    "Replace"
  >,
>(
  type: K,
  uuid: string,
) {
  const response = await retrieveById(type, uuid);
  if (response.code === 200) {
    return true;
  } else {
    return false;
  }
}
