"use server";

import { login } from "@/app/lib/requests/generics/auth";
import { LoginRequestBody } from "@/app/lib/types/data/auth";
import { FormState } from "@/app/lib/types/form/form"
import { validateLoginResponse } from "@/app/lib/validation/auth";

export async function authLogin(
  state: FormState<"Login">,
  locale: string,
) {
  const response = await login(state.result as LoginRequestBody);

  const stateValidation = await validateLoginResponse(
    response,
    state, 
    locale,
  );

  // If everything went a-okay, we want to return the response,
  // not the state.
  if (!stateValidation.error && response.data) {
    stateValidation.misc = response.data;
  }
  return stateValidation;
}
