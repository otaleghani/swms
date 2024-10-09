"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import { createInBulk } from "@/app/lib/requests/generics/createInBulk";
import validateResponse from "@/app/lib/validation/response";
import { ItemImagesPostBody } from "@/app/lib/types/data/images";

export async function createItemImages<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "ItemImagesPostBody", 
    state.result as ItemImagesPostBody
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"ItemImage">, 
    locale as string
  );

  return stateValidation;
}
