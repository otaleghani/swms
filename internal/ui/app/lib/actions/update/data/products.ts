"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Product } from "@/app/lib/types/data/products";

export async function updateProduct<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Product;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Product", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Product">, 
    locale as string
  );

  return stateValidation;
}
