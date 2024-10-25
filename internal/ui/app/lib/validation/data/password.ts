"use server";

// Constant
import { VALIDATION_SETTINGS } from "../validation.config";

// Actions and hooks
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";

// Types and interfaces
import { LoginFormState, RegisterFormState } from "@/app/ui/modules/auth/action";

export async function validatePassword(
  state: LoginFormState | RegisterFormState,
  locale: string
): Promise<LoginFormState | RegisterFormState> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  return state
}
