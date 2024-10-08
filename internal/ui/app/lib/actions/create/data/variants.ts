"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import { createInBulk } from "@/app/lib/requests/generics/createInBulk";
import validateResponse from "@/app/lib/validation/response";
import { Variant } from "@/app/lib/types/data/variants";

export async function createVariant<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const response = await create("Variant", state.result as Variant);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Variant">, 
    locale as string
  );

  return stateValidation;
}
