"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Shelf } from "@/app/lib/types/data/shelfs";

export async function updateShelf<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Shelf;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Shelf", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Shelf">, 
    locale as string
  );

  return stateValidation;
}
