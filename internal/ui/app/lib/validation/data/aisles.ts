"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Aisle } from "../../types/data/aisles";
import { FormState } from "../../types/misc";

export async function validateAisle(
  state: FormState<Aisle>,
  locale: string,
): Promise<FormState<Aisle>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.emtpy;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Aisle", 
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
    state.result.name, 
    dict.forms.fields.name.validation, 
    VALIDATION_SETTINGS.shortString.minLength,
    VALIDATION_SETTINGS.shortString.maxLength,
  )).length != 0 && (state.error = true);

  (state.errorMessages.zone = validateString(
    state.result.zone, 
    dict.forms.fields.zones.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Zone", state.result.zone)) {
    state.errorMessages.zone.push(
      dict.forms.fields.zones.validation.not_found)
    state.error = true;
  }

  return state;
}
