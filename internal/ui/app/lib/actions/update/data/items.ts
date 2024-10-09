"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Item } from "@/app/lib/types/data/items";

export async function updateItem<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Item;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Item", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Item">, 
    locale as string
  );

  return stateValidation;
}
