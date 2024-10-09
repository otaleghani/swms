"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { Client } from "@/app/lib/types/data/clients";

export async function createClient<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "Client", 
    state.result as Client,
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Client">, 
    locale as string
  );
  return stateValidation;
}
