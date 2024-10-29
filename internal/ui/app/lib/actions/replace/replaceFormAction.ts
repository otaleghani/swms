"use server";

/** Actions */
import { replace } from "../../requests/generics/replace";
import { validateState } from "../validateState";
import validateResponse from "../../validation/response";

/** Types and interfaces */
import { FormMap, FormState } from "../../types/form/form";

type ReplaceableItem = Extract<keyof FormMap,
    "Category" |
    "Subcategory" |
    "Supplier" |
    "Zone" |
    "Aisle" |
    "Rack" |
    "Shelf"
  >;

export async function replaceFormAction(
  currentState: FormState<"Replace">,
  formData: FormData
) {
  let state = currentState;
  let locale = formData.get("locale");
  //let type = formData.get("type");
  let itemToDelete = formData.get("itemToDelete");
  let itemThatReplaces = formData.get("itemThatReplaces");

  // resets the state and creates the result
  if (!state.result) {
    state.error = true;
    return state
  }

  state.result.itemToDelete = itemToDelete as string;
  state.result.itemThatReplaces = itemThatReplaces as string;
  
  const stateValidation = await validateState<"Replace">(
    state,
    "Replace",
    locale as string
  );

  if (stateValidation.error === true) {
    return stateValidation;
  }

  // We dont need a validator like in the create and update
  // because in the validateState we already checked if the
  // item exists in the db.
  const response = await replace(
    state.result.type as ReplaceableItem, 
    state.result.itemToDelete,
    state.result.itemThatReplaces
  )

  const requestValidation = await validateResponse(
    response,
    state as FormState<"Replace">,
    locale as string,
  );

  return requestValidation;
}
