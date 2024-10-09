"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { Category } from "@/app/lib/types/data/categories";

export async function createCategory<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create("Category", state.result as Category);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Category">, 
    locale as string
  );
  return stateValidation;
}
