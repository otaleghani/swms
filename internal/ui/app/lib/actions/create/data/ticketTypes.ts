"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { TicketType } from "@/app/lib/types/data/tickets";

export async function createTicketType<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "TicketType", 
    state.result as TicketType
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"TicketType">, 
    locale as string
  );

  return stateValidation;
}
