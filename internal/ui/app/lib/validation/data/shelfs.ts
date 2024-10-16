"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import validateNumber from "../number";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Shelf } from "../../types/data/shelfs";
import { FormState } from "../../types/form/form";

export async function validateShelf(
  state: FormState<"Shelf">,
  locale: string,
): Promise<FormState<"Shelf">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Shelf", 
      state, 
      state.result.id, 
      locale
    );
  }

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty_after;
    return state;
  }

  (state.errorMessages.name = validateString(
    state.result.name as string, 
    dict.form.fields.name.validation, 
    VALIDATION_SETTINGS.shortString.minLength,
    VALIDATION_SETTINGS.shortString.maxLength,
  )).length != 0 && (state.error = true);

  (state.errorMessages.zone = validateString(
    state.result.zone as string, 
    dict.form.fields.zones.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Zone", state.result.zone)) {
    state.errorMessages.zone.push(
      dict.form.fields.zones.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.aisle = validateString(
    state.result.aisle as string, 
    dict.form.fields.aisles.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Aisle", state.result.aisle)) {
    state.errorMessages.aisle.push(
      dict.form.fields.aisles.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.rack = validateString(
    state.result.rack as string, 
    dict.form.fields.racks.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Rack", state.result.rack)) {
    state.errorMessages.rack.push(
      dict.form.fields.racks.validation.not_found);
    state.error = true;
  }

  return state;
}

export async function validateShelfsBulk(
  state: FormState<"ShelfsBulk">,
  locale: string,
): Promise<FormState<"ShelfsBulk">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);
  
  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
    return state;
  }

  (state.errorMessages.quantity = validateNumber(
    String(state.result.number), 
    dict.form.fields.quantity.validation, 
    VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
    VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Zone", state.result.zone)) {
    state.errorMessages.zone.push(
      dict.form.fields.zones.validation.not_found);
    state.error = true;
  }
  if (await checkExisting("Aisle", state.result.aisle)) {
    state.errorMessages.aisle.push(
      dict.form.fields.aisles.validation.not_found);
    state.error = true;
  }
  if (await checkExisting("Rack", state.result.rack)) {
    state.errorMessages.rack.push(
      dict.form.fields.racks.validation.not_found);
    state.error = true;
  }

  if (state.error) {
    state.message = dict.form.messages.errors.general;
  }
  
  return state;
}
