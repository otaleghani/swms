"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Supplier } from "../../types/data/suppliers";
import { FormState } from "../../types/misc";

export async function validateSupplierCode(
  state: FormState<Supplier>,
  locale: string,
): Promise<FormState<Supplier>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Supplier", 
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
    /* Max */ 50
  )).length != 0 && (state.error = true);

  (state.errorMessages.description = validateString(
    state.result.description as string, 
    dict.forms.fields.description.validation, 
    /* Min */ -1, 
    /* Max */ 200
  )).length != 0 && (state.error = true);

  return state;
}
