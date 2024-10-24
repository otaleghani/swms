"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { Operation } from "@/app/lib/types/data/operations";

export async function createOperation<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "Operation", 
    state.result as Operation
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Operation">, 
    locale as string
  );

  return stateValidation;
}
