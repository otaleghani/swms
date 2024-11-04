"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Aisle } from "@/app/lib/types/data/aisles";

export async function updateAisle<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Aisle;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Aisle", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Aisle">, 
    locale as string
  );


  return stateValidation;
}
