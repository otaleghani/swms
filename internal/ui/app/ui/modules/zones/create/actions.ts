"use server";

/** Actions */
import { 
  validateZone, 
  validateZonesBulk 
} from "@/app/lib/validation/data/zones";
import validateResponse from "@/app/lib/validation/response";
import { create } from "@/app/lib/requests/generics/create";
import { createInBulk } from "@/app/lib/requests/generics/createInBulk";

/** Types and interfaces */
import { Zone } from "@/app/lib/types/data/zones";
import { FormState } from "@/app/lib/types/misc";
import { ZonesBulkPostRequestBody } from "@/app/lib/types/data/zones";

export async function zoneAddFormAction(
  currentState: FormState<Zone>,
  formData: FormData
) {
  // Get data from the form
  let state = currentState;
  const { name, locale } = Object.fromEntries(formData.entries());

  if (typeof name !== "string" || typeof locale !== "string") {
    state.error = true;
    state.message = "Mess with the best, die like the rest.";
    return state as any;
  }

  // Craft the new state of the form
  state.result = { name: name };

  // Validate the passed fields
  let fieldValidation = await validateZone(state, locale as string)
  if (fieldValidation.error) {
    return fieldValidation as any;
  }

  // Create the actual item with the validated fields
  const response = await create("Zone", state.result);
  const responseValidation = await validateResponse(
    response, 
    state, 
    locale as string
  );

  return responseValidation as any;
}

export async function zoneAddBulkFormAction(
  currentState: FormState<ZonesBulkPostRequestBody>,
  formData: FormData
) {
  // Get data from the form
  let state = currentState;
  const { quantityWithButtons, locale } = Object.fromEntries(formData.entries());
  const number = quantityWithButtons;
  if (typeof number !== "string" || typeof locale !== "string") {
    state.error = true;
    state.message = "Mess with the best, die like the rest.";
    return state as any;
  }

  // Craft the new state of the form
  state.result = { number: Number(number) };

  // Validate the passed fields
  let fieldValidation = await validateZoneBulk(state, locale as string)
  if (fieldValidation.error) {
    return fieldValidation as any;
  }

  // Create the actual item with the validated fields
  const response = await createInBulk("Zones", state.result);
  const responseValidation = await validateResponse(
    response, 
    state, 
    locale as string
  );

  return responseValidation as any;
}
