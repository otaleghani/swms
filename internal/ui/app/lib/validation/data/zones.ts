"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import validateNumber from "../number";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting } from "../database";

/** Types and interfaces */
import { Zone, ZonesBulkPostRequestBody } from "../../types/data/zones";
import { FormState } from "../../types/form/form";

/** Helper function used to validate the fields of a zone to be added or 
  * updated.
  * */
export async function validateZone(
  state: FormState<"Zone">,
  locale: string,
): Promise<FormState<"Zone">> {
  console.log("somehow, I fired this")
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);
  
  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  // In the case of a put request you will also have the id to check
  if (state.result.id) {
    state = await validateExisting(
      "Zone", 
      state, 
      state.result.id, 
      locale
    );
  }

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty_after;
    return state;
  }

  (state.errorMessages.name = validateString(
    state.result.name as string, 
    dict.forms.fields.name.validation, 
    VALIDATION_SETTINGS.shortString.minLength,
    VALIDATION_SETTINGS.shortString.maxLength,
  )).length != 0 && (state.error = true);

  if (state.error) {
    state.message = dict.forms.messages.errors.general;
  }
  
  return state;
}

export async function validateZonesBulk(
  state: FormState<"ZonesBulk">,
  locale: string,
): Promise<FormState<"ZonesBulk">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);
  
  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  (state.errorMessages.quantity = validateNumber(
    String(state.result.number), 
    dict.forms.fields.number.validation, 
    VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
    VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
  )).length != 0 && (state.error = true);

  if (state.error) {
    state.message = dict.forms.messages.errors.general;
  }
  
  return state;
}


