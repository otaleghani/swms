"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { ItemImage } from "../../types/data/images";
import { FormState } from "../../types/misc";

export async function validateItemImage(
  state: FormState<ItemImage>,
  locale: string,
): Promise<FormState<ItemImage>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.emtpy;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "ItemImage", 
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

  // For the validation uri and item are left behind because
  // uri is not set in the post request and cannot be updated,
  // item on the other hand cannot be changed and it's only 
  // important as a field for filtering reasons.

  (state.errorMessages.variant = validateString(
    state.result.variant as string, 
    dict.forms.fields.variants.validation, 
    /* Min */ -1, 
    /* Max */ 36,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Variant", state.result.variant)) {
    state.errorMessages.variant.push(
      dict.forms.fields.variants.validation.not_found)
    state.error = true;
  }

  return state;
}
