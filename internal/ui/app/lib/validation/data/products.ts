"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import validateImages from "../images";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { FormState } from "../../types/form/form";

export async function validateProduct(
  state: FormState<"Product">,
  locale: string,
): Promise<FormState<"Product">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
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

  if (state.result.client) {
    (state.errorMessages.clientWithAdd = validateString(
      state.result.client as string, 
      dict.form.fields.clients.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Client", state.result.client)) {
      state.errorMessages.clientWithAdd.push(
        dict.form.fields.clients.validation.not_found)
      state.error = true;
    }
  }

  return state;
}

export async function validateProductWithImages(
  state: FormState<"ProductWithImages">,
  locale: string,
): Promise<FormState<"ProductWithImages">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
    return state;
  }

  //if (state.result.id) {
  //  state = await validateExisting(
  //    "Product", 
  //    state, 
  //    state.result.id, 
  //    locale
  //  );
  //}

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

  if (state.result.client) {
    (state.errorMessages.clientWithAdd = validateString(
      state.result.client as string, 
      dict.form.fields.clients.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Client", state.result.client)) {
      state.errorMessages.clientWithAdd.push(
        dict.form.fields.clients.validation.not_found)
      state.error = true;
    }
  }

  if (state.result.images) {
    const { errors, images } = await validateImages(state.result.images)
    if (errors.length != 0) {
      state.errorMessages.images = errors;
      state.error = true;
    } else {
      state.result.encodedImages = images;
    }
  }

  return state;
}
