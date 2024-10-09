"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import { createInBulk } from "@/app/lib/requests/generics/createInBulk";
import validateResponse from "@/app/lib/validation/response";
import { 
  Rack, 
  RacksBulkPostRequestBody 
} from "@/app/lib/types/data/racks";

export async function createRack<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create("Rack", state.result as Rack);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Rack">, 
    locale as string
  );

  return stateValidation;
}

export async function createRacksBulk<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await createInBulk(
    "Racks", 
    state.result as RacksBulkPostRequestBody
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"RacksBulk">, 
    locale as string
  );

  return stateValidation;
}
