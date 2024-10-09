"use server" 

import { FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import { createInBulk } from "@/app/lib/requests/generics/createInBulk";
import validateResponse from "@/app/lib/validation/response";
import { 
  Aisle, 
  AislesBulkPostRequestBody
} from "@/app/lib/types/data/aisles";
import { FormMap } from "@/app/lib/types/form/form";

export async function createAisle<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create("Aisle", state.result as Aisle);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Aisle">, 
    locale as string
  );
  return stateValidation;
}

export async function createAislesBulk<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await createInBulk(
    "Aisles", 
    state.result as AislesBulkPostRequestBody
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"AislesBulk">, 
    locale as string
  );

  return stateValidation;
}
