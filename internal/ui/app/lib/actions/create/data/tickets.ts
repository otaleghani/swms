"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { Ticket } from "@/app/lib/types/data/tickets";

export async function createTicket<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "Ticket", 
    state.result as Ticket
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Ticket">, 
    locale as string
  );

  return stateValidation;
}
