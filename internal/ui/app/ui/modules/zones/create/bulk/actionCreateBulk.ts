"use server";

/** Actons */
import { validateZoneBulk } from "@/app/lib/validation/data/zones";
import validateResponse from "@/app/lib/validation/response";
import { createInBulk } from "@/app/lib/requests/generics/createInBulk";

/** Types and interfaces */
import { ZonesBulkPostRequestBody } from "@/app/lib/types/data/zones";
import { FormState } from "@/app/lib/types/misc";

export default async function zoneAddBulkFormAction(
  currentState: FormState<ZonesBulkPostRequestBody>,
  formData: FormData
) {
  // Get data from the form
  let state = currentState;
  const { number, locale } = Object.fromEntries(formData.entries());

  if (typeof number !== "string" || typeof locale !== "string") {
    state.error = true;
    state.message = "Mess with the best, die like the rest.";
    return state;
  }

  // Craft the new state of the form
  state.result = { number: Number(number) };

  // Validate the passed fields
  let fieldValidation = await validateZoneBulk(state, locale as string)
  if (fieldValidation.error) {
    return fieldValidation;
  }

  // Create the actual item with the validated fields
  const response = await createInBulk("Zones", state.result);
  const responseValidation = await validateResponse(
    response, 
    state, 
    locale as string
  );

  return responseValidation;
}
