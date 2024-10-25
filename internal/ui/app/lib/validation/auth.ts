"use server";

/** Actions */
import { getDictionary, Locale } from "@/lib/dictionaries";

/** Types and interfaces */
import { Response } from "../types/misc";
import { FormState } from "../types/form/form";
import { LoginResponseBody } from "../types/data/auth";

export async function validateLoginResponse(
  response: Response<LoginResponseBody>,
  state: FormState<"Login">,
  locale: string,
) {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (response.code === 200) {
    state.message = dict.form.messages.success.get;
    state.error = false;
    return state;
  }
  
  // User was not found or password didn't match
  if (response.code === 403) {
    state.message = dict.form.messages.errors.login.match;
    state.error = true;
    return state;
  }

  // Json unmarshal error
  if (response.code === 400) {
    state.message = dict.form.messages.errors.client;
    state.error = true;
    return state;
  }
  
  // JWT failed to produce a token or db insertion of said token
  // failed
  if (response.code === 500) {
    state.message = dict.form.messages.errors.server;
    state.error = true;
    return state;
  }

  state.message = dict.form.messages.errors.unknown;
  return state;
}

export async function validateRegisterResponse(
  response: Response<undefined>,
  state: FormState<"Register">,
  locale: string,
) {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (response.code === 201) {
    state.message = dict.form.messages.success.post;
    state.error = false;
    return state;
  }
  
  // User already in use
  if (response.code === 403) {
    state.message = dict.form.messages.errors.register.alreadyInUse;
    state.error = true;
    return state;
  }

  // Json unmarshal error
  if (response.code === 400) {
    state.message = dict.form.messages.errors.client;
    state.error = true;
    return state;
  }
  
  // Database error
  if (response.code === 500) {
    state.message = dict.form.messages.errors.server;
    state.error = true;
    return state;
  }

  state.message = dict.form.messages.errors.unknown;
  return state;
}
