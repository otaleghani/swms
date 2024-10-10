"use server";

/** Actions */
import { replace } from "../../requests/generics/replace";
import { validateState } from "../validateState";
import validateResponse from "../../validation/response";

/** Types and interfaces */
import { FormMap, FormState } from "../../types/form/form";

type ReplaceableItem = Exclude<keyof FormMap,
    "ZonesBulk" |
    "AislesBulk" |
    "RacksBulk" |
    "ShelfsBulk" |
    "ItemComplete" |
    "ProductWithImages" |
    "Delete" |
    "Replace"
  >;

export async function replaceFormAction(
  currentState: FormState<"Replace">,
  formData: FormData
) {
  let state = currentState;
  let locale = formData.get("locale");
  let type = formData.get("type");
  let replaced = formData.get("id");
  let replacer = formData.get("id");

  // resets the state and creates the result
  //state.error = false;
  //state.message = "";
  state.result = {
    replaced: replaced as string,
    replacer: replaced as string,

    type: type as string,
  }
  
  const stateValidation = await validateState<"Delete">(
    state,
    "Delete",
    locale as string
  );

  if (stateValidation.error === true) {
    return stateValidation;
  }

  // We dont need a validator like in the create and update
  // because in the validateState we already checked if the
  // item exists in the db.
  const response = await replace(
    type as RemovableItem, 
    state.result.replaced,
    state.result.replacer
  )
  const requestValidation = await validateResponse(
    response,
    state as FormState<"Delete">,
    locale as string,
  )
  return requestValidation;
}
