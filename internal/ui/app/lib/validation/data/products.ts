"use server";

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
    /* Min */ 1, 
    /* Max */ 20,
  )).length != 0 && (state.error = true);

  (state.errorMessages.description = validateString(
    state.result.description as string, 
    dict.forms.fields.description.validation, 
    /* Min */ -1, 
    /* Max */ 20,
  )).length != 0 && (state.error = true);

  (state.errorMessages.client = validateString(
    state.result.client as string, 
    dict.forms.fields.client.validation, 
    /* Min */ 36, 
    /* Max */ 36,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Client", state.result.client)) {
    state.errorMessages.client.push(
      dict.forms.fields.client.validation.not_found)
    state.error = true;
  }

  return state;
}
