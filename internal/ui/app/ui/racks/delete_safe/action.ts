"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { deleteRackSubstitution } from "@/app/lib/requests/racks/delete";

export type DeleteRackState = {
  error: true | false;
  errorMessages: {
    id: string[];
    rack: string[]
  };
  message?: string;
}

export async function DeleteRackAction(
  currentState: DeleteRackState, formData: FormData) {
  const state: DeleteRackState = {
    error: false,
    errorMessages: {
      id: [],
      rack: [],
    },
    message: "",
  }

  const data = {
    id: formData.get("id"),
    rack: formData.get("rack"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // TO DO
  // error hadling 
  // check if current id actually exist
  // check if sub id actually exist

  if (!state.error) {
    const res_body = await deleteRackSubstitution(
      data.id as string, data.rack as string)
    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.racks.edit_form.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.racks.edit_form.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.racks.edit_form.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.racks.edit_form.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.racks.bulk_form.success;
      state.error = false;
      revalidateTag("racks");
      return state;
    }
  }
  return state;
}
