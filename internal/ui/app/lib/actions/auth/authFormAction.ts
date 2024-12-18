"use server";


import { FormMap, FormState } from "../../types/form/form";
import { validateState } from "../validateState";
import { validateAuthRequest } from "./validateAuthRequest";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type AuthTypes = Pick<FormMap, "Login" | "Register">
export async function authFormAction<K extends keyof AuthTypes>(
  currentState: FormState<K>,
  formData: FormData,
) {
  let state = currentState;
  let result = state.result as FormMap[K]; 
  let locale = formData.get("locale");
  let type = formData.get("type");

  formData.forEach((value, key) => {
    if (key in result) {
      const currentValue = (result as any)[key];
      if (typeof currentValue === "number") {
        (result as any)[key] = Number(value);
      } else if (typeof currentValue === "boolean") {
        (result as any)[key] = value === "true" || value === "on";
      } else {
        (result as any)[key] = value;
      }
    }
  });
  state.result = result;
  state.error = false;
  state.message = "";

  const stateValidation = await validateState<K>(
    state, 
    type as string, 
    locale as string,
  );

  if (stateValidation.error) { 
    return stateValidation 
  };

  const requestValidation = await validateAuthRequest<K>(
    state,
    type as string,
    locale as string,
  );

  if (!requestValidation.error && requestValidation.misc) {
    // Everything went a-okay, setting the access token
    cookies().set({
      name: "access",
      value: requestValidation.misc.accessToken,
      path: "/",
      httpOnly: true,
      sameSite: true,
    });
    cookies().set({
      name: "refresh",
      value: requestValidation.misc.refreshToken,
      path: "/",
      httpOnly: true,
      sameSite: true,
    });
    redirect("/")
  }

  return requestValidation;
};
