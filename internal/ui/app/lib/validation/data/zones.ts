"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting } from "../database";

/** Types and interfaces */
import { Zone } from "../../types/data/zones";
import { FormState } from "../../types/misc";

/** Helper function used to validate the fields of a zone to be added or 
  * updated.
  * */
export async function validateZone(
  state: FormState<Zone>,
  locale: string,
): Promise<FormState<Zone>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);
  
  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.general;
    return state;
  }

  // In the case of a put request you will also have the id to check
  if (state.result.id) {
    state = await validateExisting("Zone", state, state.result.id, locale);
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

  if (state.error) {
    state.message = dict.forms.messages.errors.general;
  }
  
  return state;
}
