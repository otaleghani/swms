"use server";

/** Actions */
import { remove } from "../../requests/generics/remove";
import { validateState } from "../validateState";
import validateResponse from "../../validation/response";

/** Types and interfaces */
import { FormMap, FormState } from "../../types/form/form";

type RemovableItem = Exclude<keyof FormMap,
    "ZonesBulk" |
    "AislesBulk" |
    "RacksBulk" |
    "ShelfsBulk" |
    "ItemComplete" |
    "ProductWithImages" |
    "Delete" |
    "Replace" |
    "Login" |
    "Register"
  >;

export async function removeFormAction(
  currentState: FormState<"Delete">,
  formData: FormData
) {
  let state = currentState;
  // let result = state.result ? state.result : ({} as FormMap["Delete"]);
  let locale = formData.get("locale");
  let type = formData.get("type");
  let id = formData.get("id");
  state.error = false;

  // resets the state and creates the result
  //state.error = false;
  //state.message = "";
  state.result = {
    id: id as string,
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
  const response = await remove(
    type as RemovableItem, 
    state.result.id,
  )
  const requestValidation = await validateResponse(
    response,
    state as FormState<"Delete">,
    locale as string,
  )
  return requestValidation;
}
