"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { Zone } from "@/app/lib/types";
import { PutZone } from "@/app/lib/requests/zones/put";

export type EditZoneState = {
  error: true | false;
  errorMessages: {
    name: string[];
    id: string[];
  };
  message?: string;
}

export async function EditZoneAction(
  currentState: EditZoneState, formData: FormData) {
  const state: EditZoneState = {
    error: false,
    errorMessages: {
      name: [],
      id: [],
    },
    message: "",
  }

  const data = {
    name: formData.get("name"),
    id: formData.get("id"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  if (typeof data.name === "string") {
    if (data.name === "" || 
        data.name === undefined ||
        data.name === "0") {
      state.errorMessages.name.push(dict.zones.edit_form.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.zones.edit_form.errors.name.type);
  }

  if (!state.error) {
    const req_body: Zone = {
      id: data.id as string,
      name: data.name as string,
    }
    const res_body = await PutZone(req_body, data.id as string)

    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.zones.edit_form.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.zones.edit_form.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.zones.edit_form.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.zones.edit_form.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.zones.bulk_form.success;
      state.error = false;
      revalidateTag('zones')
      return state
    }
  }
  return state
}
