"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Subcategory } from "../../types/data/subcategories";
import { FormState } from "../../types/misc";

export async function validateSubcategory(
  state: FormState<Subcategory>,
  locale: string,
): Promise<FormState<Subcategory>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
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

  (state.errorMessages.category = validateString(
    state.result.category as string, 
    dict.forms.fields.category.validation, 
    /* Min */ 36, 
    /* Max */ 36
  )).length != 0 && (state.error = true);

  if (await checkExisting("Category", state.result.category)) {
    state.errorMessages.category.push(
      dict.forms.fields.categories.validation.not_found);
    state.error = true;
  }

  return state;
}
