"use server";

import { register } from "@/app/lib/requests/generics/auth";
import { RegisterRequestBody } from "@/app/lib/types/data/auth";
import { FormState } from "@/app/lib/types/form/form"
import { validateRegisterResponse } from "@/app/lib/validation/auth";

export async function authRegister(
  state: FormState<"Register">,
  locale: string,
) {
  const response = await register(state.result as RegisterRequestBody);
  const stateValidation = await validateRegisterResponse(
    response,
    state, 
    locale,
  );
  return stateValidation;
}
