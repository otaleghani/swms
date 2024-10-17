"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";

import { putShelf } from "@/app/lib/requests/shelfs/put";
import { Shelf } from "@/app/lib/types";

export type EditShelfState = {
  error: true | false;
  errorMessages: {
    name: string[];
    id: string[];
    zone: string[];
    aisle: string[];
    rack: string[];
  };
  message?: string;
}

export async function EditShelfAction(
  currentState: EditShelfState, formData: FormData) {
  const state: EditShelfState = {
    error: false,
    errorMessages: {
      name: [],
      id: [],
      zone: [],
      aisle: [],
      rack: [],
    },
    message: "",
  }

  const data = {
    name: formData.get("name"),
    id: formData.get("id"),
    zone: formData.get("zone"),
    aisle: formData.get("aisle"),
    rack: formData.get("rack"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  if (typeof data.name === "string") {
    if (data.name === "" || 
        data.name === undefined ||
        data.name === "0") {
      state.errorMessages.name.push(dict.shelfs.edit_form.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.shelfs.edit_form.errors.name.type);
  }

  if (!state.error) {
    const req_body: Shelf = {
      id: data.id as string,
      name: data.name as string,
      zone: data.zone as string,
      aisle: data.aisle as string,
      rack: data.rack as string,
    }
    const res_body = await putShelf(req_body, data.id as string)

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
      revalidateTag("shelfs")
      return state
    }
  }
  return state
}
