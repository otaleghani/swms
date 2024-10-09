"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Rack } from "@/app/lib/types/data/racks";

export async function updateRack<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Rack;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Rack", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Rack">, 
    locale as string
  );

  return stateValidation;
}
