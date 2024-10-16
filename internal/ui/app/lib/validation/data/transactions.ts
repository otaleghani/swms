"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import validateDate from "../dates";
import validateNumber from "../number";
import { validateExisting, checkExisting } from "../database";
import { getDictionary, Locale } from "@/lib/dictionaries";

/** Types and interfaces */
import { FormState } from "../../types/form/form";

export async function validateTransaction(
  state: FormState<"Transaction">,
  locale: string,
): Promise<FormState<"Transaction">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Transaction", 
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

  // date puts all the error messages inside of quantity
  // because the form does not have other fields
  (state.errorMessages.quantity = validateDate(
    state.result.date, 
    dict.form.fields.date.validation, 
  )).length != 0 && (state.error = true);

  (state.errorMessages.quantity = validateNumber(
    String(state.result.quantity), 
    dict.form.fields.quantity.validation, 
    VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
    VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
  )).length != 0 && (state.error = true);

  // date puts all the error messages inside of user
  // because the form does not have other fields
  (state.errorMessages.quantity = validateString(
    state.result.user as string, 
    dict.form.fields.users.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("User", state.result.user)) {
    state.errorMessages.quantity.push(
      dict.form.fields.users.validation.not_found);
    state.error = true;
  }

  // date puts all the error messages inside of items
  // because the form does not have other fields
  (state.errorMessages.quantity = validateString(
    state.result.item as string, 
    dict.form.fields.items.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Item", state.result.item)) {
    state.errorMessages.quantity.push(
      dict.form.fields.items.validation.not_found);
    state.error = true;
  }

  // date puts all the error messages inside of variants
  // because the form does not have other fields
  (state.errorMessages.quantity = validateString(
    state.result.variant as string, 
    dict.form.fields.variants.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Variant", state.result.variant)) {
    state.errorMessages.quantity.push(
      dict.form.fields.variants.validation.not_found);
    state.error = true;
  }

  if (state.result.ticket) {
    (state.errorMessages.ticket = validateString(
      state.result.ticket as string, 
      dict.form.fields.tickets.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Ticket", state.result.ticket)) {
      state.errorMessages.ticket.push(
        dict.form.fields.tickets.validation.not_found);
      state.error = true;
    }
  }

  return state;
}
