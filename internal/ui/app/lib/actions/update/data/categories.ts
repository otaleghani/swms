"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Category } from "@/app/lib/types/data/categories";

export async function updateCategory<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Category;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Category", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Category">, 
    locale as string
  );

  return stateValidation;
}
