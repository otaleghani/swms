"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Supplier } from "@/app/lib/types/data/suppliers";

export async function updateSupplier<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Supplier;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Supplier", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Supplier">, 
    locale as string
  );

  return stateValidation;
}