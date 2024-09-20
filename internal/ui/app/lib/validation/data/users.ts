"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { User } from "../../types/data/users";
import { FormState } from "../../types/misc";

export async function validateUser(
  state: FormState<User>,
  locale: string,
): Promise<FormState<User>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "User", 
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
