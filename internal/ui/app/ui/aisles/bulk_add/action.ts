"use server";

import { PostAislesBulk } from "@/app/lib/requests/aisles/post";
import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";

export type AddBulkAislesState = {
  error: true | false;
  errorMessages: {
    quantity: string[];
    zone_id: string[];
  };
  message?: string;
}

export async function AddBulkAislesAction(
  currentState: AddBulkAislesState, formData: FormData) {
  const state: AddBulkAislesState = {
    error: false,
    errorMessages: {
      quantity: [],
      zone_id: [],
    },
    message: "",
  }

  const data = {
    quantity: formData.get("quantity"),
    locale: formData.get("locale"),
    zone_id: formData.get("zone_id"),
  }

  console.log(data)

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  if (typeof data.quantity === "string") {
    if (data.quantity === "" || 
        data.quantity === undefined ||
        data.quantity === "0") {
      state.errorMessages.quantity.push(dict.aisles.bulk_form.errors.quantity.empty);
      state.error = true;
    }
    if (isNaN(Number(data.quantity)) || 
        !isFinite(Number(data.quantity))) {
      state.errorMessages.quantity.push(dict.aisles.bulk_form.errors.quantity.not_valid);
      state.error = true;
    }
  } else {
    state.errorMessages.quantity.push(dict.aisles.bulk_form.errors.quantity.type)
    state.error = true;
  }

  // TODO: Add zone_id checks

  if (!state.error) {
    const req_body = JSON.stringify({
      number: Number(data.quantity),
      zone: data.zone_id,
    });  
    const res_body = await PostAislesBulk(req_body)

    if (res_body.code !== 201) {
      if (res_body.code === 401) {
        state.message = dict.aisles.bulk_form.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.aisles.bulk_form.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.aisles.bulk_form.errors.general.internal;
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
