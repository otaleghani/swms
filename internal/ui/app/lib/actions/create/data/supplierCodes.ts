"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { SupplierCode } from "@/app/lib/types/data/supplierCodes";

export async function createSupplierCode<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "SupplierCode", 
    state.result as SupplierCode
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"SupplierCode">, 
    locale as string
  );

  return stateValidation;
}
