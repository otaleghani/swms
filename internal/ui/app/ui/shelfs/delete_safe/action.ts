"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { deleteShelfSubstitution } from "@/app/lib/requests/shelfs/delete";

export type DeleteShelfState = {
  error: true | false;
  errorMessages: {
    id: string[];
    shelf: string[]
  };
  message?: string;
}

export async function DeleteShelfAction(
  currentState: DeleteShelfState, formData: FormData) {
  const state: DeleteShelfState = {
    error: false,
    errorMessages: {
      id: [],
      shelf: [],
    },
    message: "",
  }

  const data = {
    id: formData.get("id"),
    shelf: formData.get("shelf"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // TO DO
  // error hadling 
  // check if current id actually exist
  // check if sub id actually exist

  if (!state.error) {
    const res_body = await deleteShelfSubstitution(
      data.id as string, data.shelf as string)
    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.shelfs.edit_form.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.shelfs.edit_form.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.shelfs.edit_form.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.shelfs.edit_form.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.shelfs.bulk_form.success;
      state.error = false;
      revalidateTag("shelfs");
      return state;
    }
  }
  return state;
}
