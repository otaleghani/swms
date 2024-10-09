"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { SupplierCode } from "@/app/lib/types/data/supplierCodes";

export async function updateSupplierCode<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as SupplierCode;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("SupplierCode", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"SupplierCode">, 
    locale as string
  );

  return stateValidation;
}
