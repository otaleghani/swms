"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Product } from "../../types/data/products";
import { FormState } from "../../types/misc";

export async function validateProduct(
  state: FormState<Product>,
  locale: string,
): Promise<FormState<Product>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.emtpy;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Product", 
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

  if (state.result.client) {
    (state.errorMessages.client = validateString(
      state.result.client as string, 
      dict.forms.fields.client.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Client", state.result.client)) {
      state.errorMessages.client.push(
        dict.forms.fields.client.validation.not_found)
      state.error = true;
    }
  }

  return state;
}
