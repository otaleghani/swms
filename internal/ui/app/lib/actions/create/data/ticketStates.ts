
"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { TicketState } from "@/app/lib/types/data/tickets";

export async function createTicketState<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "TicketState", 
    state.result as TicketState
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"TicketState">, 
    locale as string
  );

  return stateValidation;
}
