"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString, { validateForeignString } from "../strings";
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
    state.message = dict.form.messages.errors.empty;
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

  if (state.result.open) {
    (state.errorMessages.openDate = validateDate(
      state.result.open as string, 
      dict.form.fields.date.validation, 
    )).length != 0 && (state.error = true);
  }

  if (state.result.close) {
    (state.errorMessages.closeDate = validateDate(
      state.result.close as string, 
      dict.form.fields.date.validation, 
    )).length != 0 && (state.error = true);
  }

  (state.errorMessages.client = validateForeignString({
    field: state.result.client,
    dict: dict.form.fields.clients.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (await checkExisting("Client", state.result.client)) {
    state.errorMessages.client.push(
      dict.form.fields.clients.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.product = validateForeignString({
    field: state.result.product,
    dict: dict.form.fields.products.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (await checkExisting("Product", state.result.product)) {
    state.errorMessages.product.push(
      dict.form.fields.products.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.ticketType = validateForeignString({
    field: state.result.type,
    dict: dict.form.fields.ticketTypes.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (await checkExisting("TicketType", state.result.type)) {
    state.errorMessages.ticketType.push(
      dict.form.fields.ticketTypes.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.ticketState = validateForeignString({
    field: state.result.state,
    dict: dict.form.fields.ticketStates.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (await checkExisting("TicketState", state.result.state)) {
    state.errorMessages.ticketState.push(
      dict.form.fields.ticketStates.validation.not_found);
    state.error = true;
  }

  return state;
}
