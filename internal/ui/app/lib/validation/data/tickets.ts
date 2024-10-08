"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";
import validateDate from "../dates";

/** Types and interfaces */
import { FormState } from "../../types/form/form";

export async function validateTicket(
  state: FormState<"Ticket">,
  locale: string,
): Promise<FormState<"Ticket">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Ticket", 
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

  if (state.result.description) {
    (state.errorMessages.description = validateString(
      state.result.description as string, 
      dict.forms.fields.description.validation, 
      VALIDATION_SETTINGS.longString.minLength,
      VALIDATION_SETTINGS.longString.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.open) {
    (state.errorMessages.open = validateDate(
      state.result.open as string, 
      dict.forms.fields.date.validation, 
    )).length != 0 && (state.error = true);
  }

  if (state.result.close) {
    (state.errorMessages.close = validateDate(
      state.result.close as string, 
      dict.forms.fields.date.validation, 
    )).length != 0 && (state.error = true);
  }

  (state.errorMessages.client = validateString(
    state.result.client as string, 
    dict.forms.fields.clients.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Client", state.result.client)) {
    state.errorMessages.client.push(
      dict.forms.fields.clients.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.product = validateString(
    state.result.product as string, 
    dict.forms.fields.products.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Product", state.result.product)) {
    state.errorMessages.product.push(
      dict.forms.fields.products.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.type = validateString(
    state.result.type as string, 
    dict.forms.fields.types.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("TicketType", state.result.type)) {
    state.errorMessages.type.push(
      dict.forms.fields.types.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.state = validateString(
    state.result.state as string, 
    dict.forms.fields.states.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("TicketState", state.result.state)) {
    state.errorMessages.state.push(
      dict.forms.fields.states.validation.not_found);
    state.error = true;
  }

  return state;
}
