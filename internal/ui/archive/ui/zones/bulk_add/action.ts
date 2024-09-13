"use server";

import { PostZonesBulk } from "@/app/lib/requests/zones/post";
import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";

export type AddBulkZonesState = {
  error: true | false;
  errorMessages: {
    quantity: string[];
  };
  message?: string;
}

export async function AddBulkZonesAction(
  currentState: AddBulkZonesState, formData: FormData) {
  const state: AddBulkZonesState = {
    error: false,
    errorMessages: {
      quantity: [],
    },
    message: "",
  }

  const data = {
    quantity: formData.get("quantity"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  if (typeof data.quantity === "string") {
    if (data.quantity === "" || 
        data.quantity === undefined ||
        data.quantity === "0") {
      state.errorMessages.quantity.push(dict.zones.bulk_form.errors.quantity.empty);
      state.error = true;
    }
    if (isNaN(Number(data.quantity)) || 
        !isFinite(Number(data.quantity))) {
      state.errorMessages.quantity.push(dict.zones.bulk_form.errors.quantity.not_valid);
      state.error = true;
    }
  } else {
    state.errorMessages.quantity.push(dict.zone.bulk_form.errors.quantity.type)
    state.error = true;
  }

  if (!state.error) {
    const req_body = JSON.stringify({
      number: Number(data.quantity),
    });  
    const res_body = await PostZonesBulk(req_body)

    if (res_body.code !== 201) {
      if (res_body.code === 401) {
        state.message = dict.zones.bulk_form.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.zones.bulk_form.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.zones.bulk_form.errors.general.internal;
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
