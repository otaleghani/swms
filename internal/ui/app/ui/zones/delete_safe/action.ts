"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { deleteZoneSubstitution } from "@/app/lib/requests/zones/delete";

export type DeleteZoneState = {
  error: true | false;
  errorMessages: {
    id: string[];
    zone: string[]
  };
  message?: string;
}

export async function DeleteZoneAction(
  currentState: DeleteZoneState, formData: FormData) {
  const state: DeleteZoneState = {
    error: false,
    errorMessages: {
      id: [],
      zone: [],
    },
    message: "",
  }

  const data = {
    id: formData.get("id"),
    zone: formData.get("zone"),
    locale: formData.get("locale"),
  }
  console.log(data)

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // TO DO
  // error hadling 
  // check if current id actually exist
  // check if sub id actually exist

  if (!state.error) {
    const res_body = await deleteZoneSubstitution(data.id as string, data.zone as string)
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
      revalidateTag("zones");
      redirect("/zones/" + data.zone)
      return state;
    }
  }
  return state;
}
