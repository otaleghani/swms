"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { TicketType } from "@/app/lib/types/data/tickets";

export async function updateTicketType<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as TicketType;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("TicketType", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"TicketType">, 
    locale as string
  );

  return stateValidation;
}
