"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { SupplierCode } from "@/app/lib/types";
import { putSupplierCode } from "@/app/lib/requests/suppliers/codes/put";

export type EditSupplierCodeState = {
  error: true | false;
  errorMessages: {
    id: string[];
    code: string[];
    supplier: string[];
    item: string[];
    variant: string[];
  };
  message?: string;
}

export async function EditSupplierCodeAction(
  currentState: EditSupplierCodeState, formData: FormData) {
  const state: EditSupplierCodeState = {
    error: false,
    errorMessages: {
      id: [],
      code: [],
      supplier: [],
      item: [],
      variant: [],
    },
    message: "",
  }

  const data = {
    id: formData.get("id"),
    code: formData.get("code"),
    supplier: formData.get("supplier"),
    item: formData.get("item"),
    variant: formData.get("variant"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  if (typeof data.code === "string") {
    if (data.code === "" || 
        data.code === undefined ||
        data.code === "0") {
      state.errorMessages.code.push(dict.supplier_codes.edit_dialog.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.code.push(dict.supplier_codes.edit_dialog.errors.name.type);
  }

  if (!state.error) {
    const req_body: SupplierCode = {
      id: data.id as string,
      code: data.code as string,
      supplier: data.supplier as string,
      item: data.item as string,
      variant: data.variant as string,
    }
    const res_body = await putSupplierCode(req_body, data.id as string)

    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.supplier_codes.edit_dialog.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.supplier_codes.edit_dialog.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.supplier_codes.edit_dialog.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.supplier_codes.edit_dialog.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.supplier_codes.edit_dialog.success;
      state.error = false;
      revalidateTag("supplier-codes")
      return state
    }
  }
  return state
}
