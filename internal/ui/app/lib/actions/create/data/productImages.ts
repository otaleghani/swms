"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { ProductImagesPostBody } from "@/app/lib/types/data/images";

export async function createProductImages<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "ProductImagesPostBody", 
    state.result as ProductImagesPostBody
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"ProductImage">, 
    locale as string
  );

  return stateValidation;
}
