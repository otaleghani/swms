"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";

/** Types and interfaces */
import { ZoneFormState } from "../../types/data/zones";

/** Helper function used to validate the fieldsa zone to be added or 
  * updated.
  * */
export async function validateZone(
  state: ZoneFormState,
  locale: string,
): Promise<ZoneFormState> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);
  
  if (!state.result) {
    state.error = true;
    return state;
  }

  // In the case of a put request you will also have the id to check
  if (state.result.id) {
    validateExistingZone(state.result.id);
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

/** Check if the passed uuid returns a correct zone.
  * */
export async function validateExistingZone(uuid: string) {

}
