"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import validateNumber from "../number";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Rack } from "../../types/data/racks";
import { FormState } from "../../types/form/form";

export async function validateRack(
  state: FormState<"Rack">,
  locale: string,
): Promise<FormState<"Rack">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting("Rack", state, state.result.id, locale);
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

  (state.errorMessages.zone = validateString(
    state.result.zone as string, 
    dict.forms.fields.zones.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Zone", state.result.zone)) {
    state.errorMessages.zone.push(
      dict.forms.fields.zones.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.aisle = validateString(
    state.result.aisle as string, 
    dict.forms.fields.aisles.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Aisle", state.result.aisle)) {
    state.errorMessages.aisle.push(
      dict.forms.fields.aisles.validation.not_found);
    state.error = true;
  }

  return state;
}

export async function validateRacksBulk(
  state: FormState<"RacksBulk">,
  locale: string,
): Promise<FormState<"RacksBulk">> {
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

  if (await checkExisting("Zone", state.result.zone)) {
    state.errorMessages.zone.push(
      dict.forms.fields.zones.validation.not_found);
    state.error = true;
  }
  if (await checkExisting("Aisle", state.result.aisle)) {
    state.errorMessages.aisle.push(
      dict.forms.fields.aisles.validation.not_found);
    state.error = true;
  }

  if (state.error) {
    state.message = dict.forms.messages.errors.general;
  }
  
  return state;
}
