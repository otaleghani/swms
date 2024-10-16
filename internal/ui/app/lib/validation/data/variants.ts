"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import validateNumber from "../number";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { FormState } from "../../types/form/form";

/** @todo Add validation for defaultVariant: boolean */
export async function validateVariant(
  state: FormState<"Variant">,
  locale: string,
): Promise<FormState<"Variant">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Variant", 
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

  if (state.result.description) {
    (state.errorMessages.description = validateString(
      state.result.description as string, 
      dict.form.fields.description.validation, 
      VALIDATION_SETTINGS.longString.minLength,
      VALIDATION_SETTINGS.longString.maxLength,
    )).length != 0 && (state.error = true);
  }

  (state.errorMessages.identifier = validateString(
    state.result.identifier as string, 
    dict.form.fields.identifier.validation, 
    VALIDATION_SETTINGS.mediumString.minLength,
    VALIDATION_SETTINGS.mediumString.maxLength,
  )).length != 0 && (state.error = true);

  (state.errorMessages.quantity = validateNumber(
    String(state.result.quantity), 
    dict.form.fields.categories.validation, 
    VALIDATION_SETTINGS.bigSignedNumber.minLength,
    VALIDATION_SETTINGS.bigSignedNumber.maxLength,
  )).length != 0 && (state.error = true);

  if (state.result.length) {
    (state.errorMessages.length = validateNumber(
      String(state.result.length), 
      dict.form.fields.length.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.width) {
    (state.errorMessages.width = validateNumber(
      String(state.result.width), 
      dict.form.fields.width.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.heigth) {
    (state.errorMessages.heigth = validateNumber(
      String(state.result.heigth), 
      dict.form.fields.height.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.weight) {
    (state.errorMessages.weight = validateNumber(
      String(state.result.weight), 
      dict.form.fields.weight.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  //(state.errorMessages.item = validateString(
  //  state.result.item as string, 
  //  dict.form.fields.items.validation, 
  //  VALIDATION_SETTINGS.foreignKeys.minLength,
  //  VALIDATION_SETTINGS.foreignKeys.maxLength,
  //)).length != 0 && (state.error = true);
  //if (await checkExisting("Item", state.result.item)) {
  //  state.errorMessages.item.push(
  //    dict.form.fields.items.validation.not_found);
  //  state.error = true;
  //}

  return state;
}
