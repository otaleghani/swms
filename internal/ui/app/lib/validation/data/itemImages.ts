"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import validateImages from "../images";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { checkExisting } from "../database";

/** Types and interfaces */
import { FormState } from "../../types/form/form";

export async function validateItemImage(
  state: FormState<"ItemImage">,
  locale: string,
): Promise<FormState<"ItemImage">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
    return state;
  }
  
  // TO DO => why did I do it like this?
  (state.errorMessages.images = validateString(
    state.result.item, 
    dict.form.fields.items.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Item", state.result.item)) {
    state.errorMessages.images.push(
      dict.form.fields.items.validation.not_found)
    state.error = true;
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

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty_after;
    return state;
  }

  return state;
}
