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

export async function validateProductImage(
  state: FormState<"ProductImage">,
  locale: string,
): Promise<FormState<"ProductImage">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.emtpy;
    return state;
  }
  
  (state.errorMessages.images = validateString(
    state.result.product, 
    dict.forms.fields.item.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Product", state.result.product)) {
    state.errorMessages.images.push(
      dict.forms.fields.items.validation.not_found)
    state.error = true;
  }

  if (state.result.images) {
    const { errors, images } = await validateImages(state.result.images)
    if (errors.length != 0) {
      state.errorMessages.images = errors;
      state.error = true;
    } else {
      state.result.images = images;
    }
  }

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty_after;
    return state;
  }

  return state;
}
