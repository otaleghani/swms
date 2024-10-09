"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { Transaction } from "@/app/lib/types/data/transactions";

export async function createTransaction<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "Transaction", 
    state.result as Transaction
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Transaction">, 
    locale as string
  );

  return stateValidation;
}
