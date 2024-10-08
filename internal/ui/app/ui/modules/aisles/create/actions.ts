"use server";

/** Actons */
import { validateAisle, validateAisleBulk } from "@/app/lib/validation/data/aisles";
import validateResponse from "@/app/lib/validation/response";
import { create } from "@/app/lib/requests/generics/create";
import { createInBulk } from "@/app/lib/requests/generics/createInBulk";

/** Types and interfaces */
import { Aisle, AislesBulkPostRequestBody } from "@/app/lib/types/data/aisles";
import { FormState } from "@/app/lib/types/form/form";

export async function aisleCreateFormAction(
  currentState: FormState<"Aisle">,
  formData: FormData
) {
  // Get data from the form
  let state = currentState;
  const { name, zone, locale } = Object.fromEntries(formData.entries());

  if (typeof name !== "string" || 
      typeof locale !== "string" ||
      typeof zone !== "string"
    ) {
    state.error = true;
    state.message = "Mess with the best, die like the rest.";
    return state as any;
  }

  // Craft the new state of the form
  state.result = { name: name, zone: zone };

  // Validate the passed fields
  let fieldValidation = await validateAisle(state, locale as string)
  if (fieldValidation.error) {
    return fieldValidation as any;
  }

  // Create the actual item with the validated fields
  const response = await create("Aisle", state.result);
  const responseValidation = await validateResponse(
    response, 
    state, 
    locale as string
  );

  return responseValidation as any;
}

export async function aisleAddBulkFormAction(
  currentState: FormState<"AislesBulk">,
  formData: FormData
) {
  // Get data from the form
  let state = currentState;
  const { 
    quantityWithButtons, 
    zone,
    locale 
  } = Object.fromEntries(formData.entries());
  const number = quantityWithButtons;
  if (typeof number !== "string" || typeof locale !== "string") {
    state.error = true;
    state.message = "Mess with the best, die like the rest.";
    return state as any;
  }

  // Craft the new state of the form
  state.result = { number: Number(number), zone: 
    { 
      id: String(zone), 
      name: "",
    }
  };

  // Validate the passed fields
  let fieldValidation = await validateAisleBulk(state, locale as string)
  if (fieldValidation.error) {
    return fieldValidation as any;
  }

  // Create the actual item with the validated fields
  const response = await createInBulk("Aisles", state.result);
  const responseValidation = await validateResponse(
    response, 
    state, 
    locale as string
  );

  return responseValidation as any;
}
