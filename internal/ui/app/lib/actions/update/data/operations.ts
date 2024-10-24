"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Operation } from "@/app/lib/types/data/operations";

export async function updateOperation<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Operation;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Operation", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Operation">, 
    locale as string
  );

  return stateValidation;
}
