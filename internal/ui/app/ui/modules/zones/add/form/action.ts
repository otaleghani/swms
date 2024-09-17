"use server";

import { postZone } from "@/app/lib/requests/data/zones/post";
import { Zone, ZoneFormState } from "@/app/lib/types/data/zones";
import { validateZone } from "@/app/lib/validation/data/zones";
import validateResponse from "@/app/lib/validation/response";

export default async function zoneAddFormAction(
  currentState: ZoneFormState,
  formData: FormData
) {
  // Get data from the form
  const { name, locale } = Object.fromEntries(formData.entries());

  // Craft the new state of the form
  let formState = currentState;
  formState.result = {
    name: name as string,
  }

  // Validate the passed fields
  let formStateValidatedFields = await validateZone(formState, locale as string)
  if (formStateValidatedFields.error) {
    return formStateValidatedFields;
  }

  // Post the zone and validate it
  const response = await postZone(formStateValidatedFields.result as Zone);
  const formStateValidatedResponse = await validateResponse(response, formStateValidatedFields, locale as string)

  return formStateValidatedResponse;
}
