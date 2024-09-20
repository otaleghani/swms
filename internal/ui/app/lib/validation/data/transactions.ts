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
import { Transaction } from "../../types/data/transactions";
import { FormState } from "../../types/misc";

export async function validateTransaction(
  state: FormState<Transaction>,
  locale: string,
): Promise<FormState<Transaction>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
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
    state.errorMessages = dict.forms.messages.errors.empty_after;
    return state;
  }

  (state.errorMessages.date = validateDate(
    state.result.date, 
    dict.forms.fields.date.validation, 
  )).length != 0 && (state.error = true);

  (state.errorMessages.quantity = validateNumber(
    String(state.result.quantity), 
    dict.forms.fields.quantity.validation, 
    VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
    VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
  )).length != 0 && (state.error = true);

  (state.errorMessages.user = validateString(
    state.result.user as string, 
    dict.forms.fields.users.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("User", state.result.user)) {
    state.errorMessages.user.push(
      dict.forms.fields.users.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.item = validateString(
    state.result.item as string, 
    dict.forms.fields.items.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Item", state.result.item)) {
    state.errorMessages.item.push(
      dict.forms.fields.items.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.variant = validateString(
    state.result.variant as string, 
    dict.forms.fields.variants.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Variant", state.result.variant)) {
    state.errorMessages.variant.push(
      dict.forms.fields.variants.validation.not_found);
    state.error = true;
  }

  if (state.result.ticket) {
    (state.errorMessages.ticket = validateString(
      state.result.ticket as string, 
      dict.forms.fields.tickets.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Ticket", state.result.ticket)) {
      state.errorMessages.ticket.push(
        dict.forms.fields.tickets.validation.not_found);
      state.error = true;
    }
  }

  return state;
}
