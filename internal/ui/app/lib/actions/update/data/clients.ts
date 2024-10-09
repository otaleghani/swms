"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Client } from "@/app/lib/types/data/clients";

export async function updateClient<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Client;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Client", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Client">, 
    locale as string
  );

  return stateValidation;
}
