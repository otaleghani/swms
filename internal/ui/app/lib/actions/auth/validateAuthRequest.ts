"use server";

import { FormState } from "../../types/form/form";
import { AuthTypes } from "./authFormAction";
import { authLogin } from "./data/login";
import { authRegister } from "./data/register";

export async function validateAuthRequest<K extends keyof AuthTypes>(
  state: FormState<K>,
  type: string,
  locale: string,
) {
  let result;
  switch (type) {
    case "Login":
      result = await authLogin(state as FormState<"Login">, locale);
      break;

    case "Register":
      result = await authRegister(state as FormState<"Register">, locale);
      //console.log("got here")
      break;

    default:
      result = state;
      result.error = true;
      result.message = "Oh-oh. This one is a doozy. Open an issue on github with the steps to replicate this message. Thank you!"
      break;
  }

  return result;
}
