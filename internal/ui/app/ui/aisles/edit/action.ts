"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { PutAisle } from "@/app/lib/requests/aisles/put";
import { Aisle } from "@/app/lib/types";

export type EditAisleState = {
  error: true | false;
  errorMessages: {
    name: string[];
    id: string[];
    zone: string[];
  };
  message?: string;
}

export async function EditAisleAction(
  currentState: EditAisleState, formData: FormData) {
  const state: EditAisleState = {
    error: false,
    errorMessages: {
      name: [],
      id: [],
      zone: [],
    },
    message: "",
  }

  const data = {
    name: formData.get("name"),
    id: formData.get("id"),
    zone: formData.get("zone"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  if (typeof data.name === "string") {
    if (data.name === "" || 
        data.name === undefined ||
        data.name === "0") {
      state.errorMessages.name.push(dict.aisles.edit_form.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.aisles.edit_form.errors.name.type);
  }

  if (!state.error) {
    const req_body: Aisle = {
      id: data.id as string,
      name: data.name as string,
      zone: data.zone as string,
    }
    const res_body = await PutAisle(req_body, data.id as string)

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
      revalidateTag("aisles")
      return state
    }
  }
  return state
}
