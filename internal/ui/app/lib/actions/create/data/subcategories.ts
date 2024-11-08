
"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { Subcategory } from "@/app/lib/types/data/subcategories";

export async function createSubcategory<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "Subcategory", 
    state.result as Subcategory
  );

  const stateValidation = await validateResponse(
    response,
    state as FormState<"Subcategory">, 
    locale as string
  );
  return stateValidation;
}
