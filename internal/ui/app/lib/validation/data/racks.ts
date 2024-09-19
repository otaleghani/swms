"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Rack } from "../../types/data/racks";
import { FormState } from "../../types/misc";

export async function validateRack(
  state: FormState<Rack>,
  locale: string,
): Promise<FormState<Rack>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting("Rack", state, state.result.id, locale);
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

  (state.errorMessages.zone = validateString(
    state.result.zone as string, 
    dict.forms.fields.zones.validation, 
    /* Min */ 36, 
    /* Max */ 36
  )).length != 0 && (state.error = true);

  if (await checkExisting("Zone", state.result.zone)) {
    state.errorMessages.zone.push(
      dict.forms.fields.zones.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.aisle = validateString(
    state.result.aisle as string, 
    dict.forms.fields.aisles.validation, 
    /* Min */ 36, 
    /* Max */ 36
  )).length != 0 && (state.error = true);

  if (await checkExisting("Aisle", state.result.aisle)) {
    state.errorMessages.aisle.push(
      dict.forms.fields.aisles.validation.not_found);
    state.error = true;
  }

  return state;
}
