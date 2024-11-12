"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString, { validateForeignString } from "../strings";
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

  (state.errorMessages.zone = validateForeignString({
    field: state.result.zone,
    dict: dict.form.fields.zones.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Zone", state.result.zone)) {
    state.errorMessages.zone.push(
      dict.form.fields.zones.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.aisle = validateForeignString({
    field: state.result.aisle,
    dict: dict.form.fields.aisles.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Aisle", state.result.aisle)) {
    state.errorMessages.aisle.push(
      dict.form.fields.aisles.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.rack = validateForeignString({
    field: state.result.rack,
    dict: dict.form.fields.racks.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Rack", state.result.rack)) {
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
    String(state.result.quantity), 
    dict.form.fields.quantity.validation, 
    VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
    VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
  )).length != 0 && (state.error = true);

  (state.errorMessages.zone = validateForeignString({
    field: state.result.zone,
    dict: dict.form.fields.zones.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Zone", state.result.zone)) {
    state.errorMessages.zone.push(
      dict.form.fields.zones.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.aisle = validateForeignString({
    field: state.result.aisle,
    dict: dict.form.fields.aisles.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Aisle", state.result.aisle)) {
    state.errorMessages.aisle.push(
      dict.form.fields.aisles.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.rack = validateForeignString({
    field: state.result.rack,
    dict: dict.form.fields.racks.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Rack", state.result.rack)) {
    state.errorMessages.rack.push(
      dict.form.fields.racks.validation.not_found);
    state.error = true;
  }

  if (state.error) {
    state.message = dict.form.messages.errors.general;
  }
  
  return state;
}
