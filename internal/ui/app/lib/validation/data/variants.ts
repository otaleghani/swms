"use server";

/** Actions */
import validateString from "../strings";
import validateNumber from "../number";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Variant } from "../../types/data/variants";
import { FormState } from "../../types/misc";

/** @todo Add validation for defaultVariant: boolean */
export async function validateVariant(
  state: FormState<Variant>,
  locale: string,
): Promise<FormState<Variant>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Variant", 
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

  (state.errorMessages.identifier = validateString(
    state.result.identifier as string, 
    dict.forms.fields.identifier.validation, 
    /* Min */ -1, 
    /* Max */ 200
  )).length != 0 && (state.error = true);

  (state.errorMessages.quantity = validateNumber(
    String(state.result.quantity), 
    dict.forms.fields.categories.validation, 
    /* Min */ -20000, 
    /* Max */ 20000
  )).length != 0 && (state.error = true);

  (state.errorMessages.length = validateNumber(
    String(state.result.length), 
    dict.forms.fields.length.validation, 
    /* Min */ -20000, 
    /* Max */ 20000
  )).length != 0 && (state.error = true);

  (state.errorMessages.width = validateNumber(
    String(state.result.width), 
    dict.forms.fields.width.validation, 
    /* Min */ -20000, 
    /* Max */ 20000
  )).length != 0 && (state.error = true);

  (state.errorMessages.heigth = validateNumber(
    String(state.result.heigth), 
    dict.forms.fields.heigth.validation, 
    /* Min */ -20000, 
    /* Max */ 20000
  )).length != 0 && (state.error = true);

  (state.errorMessages.weight = validateNumber(
    String(state.result.weight), 
    dict.forms.fields.weight.validation, 
    /* Min */ -20000, 
    /* Max */ 20000
  )).length != 0 && (state.error = true);

  (state.errorMessages.item = validateString(
    state.result.item as string, 
    dict.forms.fields.items.validation, 
    /* Min */ 36, 
    /* Max */ 36
  )).length != 0 && (state.error = true);

  if (await checkExisting("Item", state.result.item)) {
    state.errorMessages.item.push(
      dict.forms.fields.items.validation.not_found);
    state.error = true;
  }

  return state;
}
