"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { update } from "@/app/lib/requests/generics/update"
import validateResponse from "@/app/lib/validation/response";
import { TicketState } from "@/app/lib/types/data/tickets";

export async function updateTicketState<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string,
){
  const result = state.result as TicketState;

  if (result.id === undefined) {
    state.error = true;
    state.message = "Malformed request.";
    return state
  }

  const response = await update("TicketState", result.id, result);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"TicketState">, 
    locale as string
  );

  return stateValidation;
}
