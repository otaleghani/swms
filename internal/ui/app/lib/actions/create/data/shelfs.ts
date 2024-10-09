"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import { createInBulk } from "@/app/lib/requests/generics/createInBulk";
import validateResponse from "@/app/lib/validation/response";
import { 
  Shelf, 
  ShelfsBulkPostRequestBody 
} from "@/app/lib/types/data/shelfs";

export async function createShelf<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create("Shelf", state.result as Shelf);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Shelf">, 
    locale as string
  );

  return stateValidation;
}

export async function createShelfsBulk<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await createInBulk(
    "Shelfs", 
    state.result as ShelfsBulkPostRequestBody
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"ShelfsBulk">, 
    locale as string
  );

  return stateValidation;
}
