"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { Zone } from "@/app/lib/types/data/zones";

export async function updateZone<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as Zone;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("Zone", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Zone">, 
    locale as string
  );

  return stateValidation;
}