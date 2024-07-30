"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";

import { putRack } from "@/app/lib/requests/racks/put";
import { Rack } from "@/app/lib/types";

export type EditRackState = {
  error: true | false;
  errorMessages: {
    name: string[];
    id: string[];
    zone: string[];
    aisle: string[];
  };
  message?: string;
}

export async function EditRackAction(
  currentState: EditRackState, formData: FormData) {
  const state: EditRackState = {
    error: false,
    errorMessages: {
      name: [],
      id: [],
      zone: [],
      aisle: [],
    },
    message: "",
  }

  const data = {
    name: formData.get("name"),
    id: formData.get("id"),
    zone: formData.get("zone"),
    aisle: formData.get("aisle"),
    locale: formData.get("locale"),
  }
  
  console.log(data)

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  if (typeof data.name === "string") {
    if (data.name === "" || 
        data.name === undefined ||
        data.name === "0") {
      state.errorMessages.name.push(dict.racks.edit_form.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.racks.edit_form.errors.name.type);
  }

  if (!state.error) {
    const req_body: Rack = {
      id: data.id as string,
      name: data.name as string,
      zone: data.zone as string,
      aisle: data.aisle as string,
    }
    const res_body = await putRack(req_body, data.id as string)

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
      revalidateTag("racks")
      return state
    }
  }
  return state
}
