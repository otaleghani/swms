"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting } from "../database";

/** Types and interfaces */
import { Category } from "../../types/data/categories";
import { FormState } from "../../types/misc";

export async function validateCategory(
  state: FormState<Category>,
  locale: string,
): Promise<FormState<Category>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Category", 
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
    /* Min */ 2, 
    /* Max */ 20
  )).length != 0 && (state.error = true);

  (state.errorMessages.description = validateString(
    state.result.description as string, 
    dict.forms.fields.description.validation, 
    /* Min */ -1, 
    /* Max */ 200
  )).length != 0 && (state.error = true);

  return state;
}
