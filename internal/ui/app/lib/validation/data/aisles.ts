"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Aisle } from "../../types/data/aisles";
import { FormState } from "../../types/misc";

export async function validateAisle(
  state: FormState<Aisle>,
  locale: string,
): Promise<FormState<Aisle>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.general;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting("Aisle", state, state.result.id, locale);
  }

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.general;
    return state;
  }

  (state.errorMessages.name = validateString(
    state.result.name as string, 
    dict.forms.fields.name.validation, 
    /* Min */ 2, 
    /* Max */ 20
  )).length != 0 && (state.error = true);

  (state.errorMessages.zone = validateString(
    state.result.zone as string, 
    dict.forms.fields.zone.validation, 
    /* Min */ 36, 
    /* Max */ 36
  )).length != 0 && (state.error = true);

  if (await checkExisting("Zone", state.result.zone)) {
    state.errorMessages = dict.forms.fields.zone.validation.non_existing;
    state.error = true;
  }

  return state;
}
