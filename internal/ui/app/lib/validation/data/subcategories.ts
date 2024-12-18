"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString, { validateForeignString } from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { FormState } from "../../types/form/form";

export async function validateSubcategory(
  state: FormState<"Subcategory">,
  locale: string,
): Promise<FormState<"Subcategory">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Subcategory", 
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

  (state.errorMessages.category = validateForeignString({
    field: state.result.category,
    dict: dict.form.fields.categories.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Category", state.result.category)) {
    state.errorMessages.category.push(
      dict.form.fields.categories.validation.not_found);
    state.error = true;
  }

  return state;
}
