"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { Supplier } from "@/app/lib/types/data/suppliers";

export async function createSupplier<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "Supplier", 
    state.result as Supplier
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Supplier">, 
    locale as string
  );

  return stateValidation;
}
