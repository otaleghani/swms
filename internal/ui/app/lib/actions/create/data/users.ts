"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { User } from "@/app/lib/types/data/users";

export async function createUser<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "User", 
    state.result as User
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"User">, 
    locale as string
  );

  return stateValidation;
}
