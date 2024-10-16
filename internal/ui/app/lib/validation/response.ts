"use server";

/** Actions */
import { getDictionary, Locale } from "@/lib/dictionaries";

/** Types and interfaces */
import { Response } from "../types/misc";
import { FormMap, FormState } from "../types/form/form";

export default async function validateResponse<Entity, Type extends keyof FormMap>(
  response: Response<Entity>,
  state: FormState<Type>,
  locale: string,
): Promise<FormState<Type>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (response.code === 200) {
    state.message = dict.form.messages.success.get;
    state.error = false;
    return state;
  }
  if (response.code === 201) {
    state.message = dict.form.messages.success.post;
    state.error = false;
    return state;
  }

  if (response.code === 401) {
    state.message = dict.form.messages.errors.auth;
    state.error = true;
    return state;
  }
  if (response.code === 404) {
    state.message = dict.form.messages.errors.not_found;
    state.error = true;
    return state;
  }
  if (response.code === 400) {
    state.message = dict.form.messages.errors.client;
    state.error = true;
    return state;
  }
  if (response.code === 500) {
    state.message = dict.form.messages.errors.server;
    state.error = true;
    return state;
  }

  state.message = dict.form.messages.errors.unknown;
  return state;
}
