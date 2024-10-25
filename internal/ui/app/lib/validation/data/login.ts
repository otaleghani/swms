"use server";

// Constant
import { VALIDATION_SETTINGS } from "../validation.config";

// Hooks and actions
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

// Types and interfaces
import { FormState } from "../../types/form/form";

export async function validateLogin(
  state: FormState<"Login">,
  locale: string
): Promise<FormState<"Login">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
    return state;
  }

  (state.errorMessages.email = validateString(
    state.result.email, 
    dict.form.fields.email.validation, 
    VALIDATION_SETTINGS.shortString.minLength,
    VALIDATION_SETTINGS.shortString.maxLength,
  )).length != 0 && (state.error = true);

  (state.errorMessages.password = validateString(
    state.result.password, 
    dict.form.fields.password.validation, 
    VALIDATION_SETTINGS.shortString.minLength,
    VALIDATION_SETTINGS.shortString.maxLength,
  )).length != 0 && (state.error = true);

  return state;
}
