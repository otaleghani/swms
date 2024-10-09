"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Subcategory } from "@/app/lib/types/data/subcategories";

export async function updateSubcategory<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Subcategory;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Subcategory", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Subcategory">, 
    locale as string
  );

  return stateValidation;
}
