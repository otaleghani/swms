"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { Supplier } from "@/app/lib/types";
import { putSupplier } from "@/app/lib/requests/suppliers/put";

export type EditSupplierState = {
  error: true | false;
  errorMessages: {
    description: string[];
    name: string[];
    id: string[];
  };
  message?: string;
}

export async function EditSupplierAction(
  currentState: EditSupplierState, formData: FormData) {
  const state: EditSupplierState = {
    error: false,
    errorMessages: {
      description: [],
      name: [],
      id: [],
    },
    message: "",
  }

  const data = {
    description: formData.get("description"),
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
      state.errorMessages.name.push(dict.suppliers.edit_form.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.suppliers.edit_form.errors.name.type);
  }

  if (!state.error) {
    const req_body: Supplier = {
      id: data.id as string,
      name: data.name as string,
      description: data.description as string,
    }

    const res_body = await putSupplier(req_body, data.id as string)

    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.suppliers.edit_form.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.suppliers.edit_form.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.suppliers.edit_form.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.suppliers.edit_form.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.suppliers.edit_form.success;
      state.error = false;
      revalidateTag('suppliers')
      return state
    }
  }
  return state
}
