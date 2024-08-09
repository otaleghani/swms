"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { deleteAisleSubstitution } from "@/app/lib/requests/aisles/delete";

export type DeleteAisleState = {
  error: true | false;
  errorMessages: {
    id: string[];
    aisle: string[]
  };
  message?: string;
}

export async function DeleteAisleAction(
  currentState: DeleteAisleState, formData: FormData) {
  const state: DeleteAisleState = {
    error: false,
    errorMessages: {
      id: [],
      aisle: [],
    },
    message: "",
  }

  const data = {
    id: formData.get("id"),
    aisle: formData.get("aisle"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // TO DO
  // error hadling 
  // check if current id actually exist
  // check if sub id actually exist

  if (!state.error) {
    const res_body = await deleteAisleSubstitution(data.id as string, data.aisle as string)
    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.aisles.edit_form.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.aisles.edit_form.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.aisles.edit_form.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.aisles.edit_form.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.aisles.bulk_form.success;
      state.error = false;
      revalidateTag("aisles");
      return state;
    }
  }
  return state;
}
