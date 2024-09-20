"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting } from "../database";

/** Types and interfaces */
import { Client } from "../../types/data/clients";
import { FormState } from "../../types/misc";

/** @todo Add boolean validation if necessary */
export async function validateCategory(
  state: FormState<Client>,
  locale: string,
): Promise<FormState<Client>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Client", 
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

  (state.errorMessages.surname = validateString(
    state.result.surname as string, 
    dict.forms.fields.surname.validation, 
    /* Min */ -1, 
    /* Max */ 20
  )).length != 0 && (state.error = true);

  return state;
}
