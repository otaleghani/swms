"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import { createInBulk } from "@/app/lib/requests/generics/createInBulk";
import validateResponse from "@/app/lib/validation/response";
import { 
  Zone, 
  ZonesBulkPostRequestBody 
} from "@/app/lib/types/data/zones";

export async function createZone<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create("Zone", state.result as Zone);
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Zone">, 
    locale as string
  );

  return stateValidation;
}

export async function createZonesBulk<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await createInBulk(
    "Zones", 
    state.result as ZonesBulkPostRequestBody
  );
  //console.log(response)
  const stateValidation = await validateResponse(
    response,
    state as FormState<"ZonesBulk">, 
    locale as string
  );

  return stateValidation;
}
