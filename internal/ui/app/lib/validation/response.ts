"use server";

/** Actions */
import { getDictionary, Locale } from "@/lib/dictionaries";

/** Types and interfaces */
import { Response, FormState } from "../types/misc";

export default async function validateResponse<Entity, Type>(
  response: Response<Entity>,
  state: FormState<Type>,
  locale: string,
): Promise<FormState<Type>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (response.code === 200) {
    state.message = dict.forms.messages.success.get;
    state.error = false;
    return state;
  }
  if (response.code === 201) {
    state.message = dict.forms.messages.success.post;
    state.error = false;
    return state;
  }

  if (response.code === 401) {
    state.message = dict.forms.messages.errors.auth;
    return state;
  }
  if (response.code === 404) {
    state.message = dict.forms.messages.errors.not_found;
    return state;
  }
  if (response.code === 400) {
    state.message = dict.forms.messages.errors.client;
    return state;
  }
  if (response.code === 500) {
    state.message = dict.forms.messages.errors.server;
    return state;
  }

  state.message = dict.forms.messages.errors.unknown;
  return state;
}
