"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { deleteSupplierCode } from "@/app/lib/requests/suppliers/codes/delete";

export type DeleteSupplierCodeState = {
  error: true | false;
  errorMessages: {
    id: string[];
  };
  message?: string;
}

export async function DeleteSupplierCodeAction(
  currentState: DeleteSupplierCodeState, formData: FormData) {
  const state: DeleteSupplierCodeState = {
    error: false,
    errorMessages: {
      id: [],
    },
    message: "",
  }

  const data = {
    id: formData.get("id"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // TO DO
  // error hadling 
  // check if current id actually exist
  // check if sub id actually exist

  if (!state.error) {
    const res_body = await deleteSupplierCode(data.id as string);
    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.supplier_codes.delete_dialog.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.supplier_codes.delete_dialog.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.supplier_codes.delete_dialog.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.supplier_codes.delete_dialog.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.supplier_codes.delete_dialog.success;
      state.error = false;
      revalidateTag("supplier-codes");
      return state;
    }
  }
  return state;
}
