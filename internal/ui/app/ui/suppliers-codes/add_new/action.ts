"use server";

import { postSupplierCode } from "@/app/lib/requests/suppliers/codes/post";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SupplierCode } from "@/app/lib/types";
import { revalidateTag } from "next/cache";

export type AddSupplierCodeDialogState = {
  error: true | false;
  errorMessages: {
    code: string[];
    supplier: string[];
    item: string[];
    variant: string[];
  };
  message?: string;
  result?: SupplierCode;
};

export async function AddSupplierCodeDialogAction(
  currentState: AddSupplierCodeDialogState, formData: FormData) {
  const state: AddSupplierCodeDialogState = {
    error: false,
    errorMessages: {
      code: [],
      supplier: [],
      item: [],
      variant: [],
    },
  };
  const data = {
    code: formData.get("code"),
    supplier: formData.get("supplier"),
    item: formData.get("item"),
    variant: formData.get("variant"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  // VALIDATION
  if (typeof data.code === "string") {
    if (data.code === "" ||
       data.code === undefined) {
      state.errorMessages.code.push(dict.supplier_codes.add_dialog.errors.code.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.code.push(dict.supplier_codes.add_dialog.errors.code.type);
    state.error = true;
  }

  // TODO: Add server side validation for supplier, variant and item

  if (!state.error) {
    const res_body = await postSupplierCode({
      code: data.code,
      supplier: data.supplier,
      item: data.item,
      variant: data.variant,
    } as SupplierCode);

    if (res_body.code !== 201) {
      if (res_body.code === 401) {
        redirect("/login?error=true");
      }
      if (res_body.code === 400) {
        state.error = true;
        state.message = dict.supplier_codes.add_dialog.errors.general.marshal;
        return state;
      }
      if (res_body.code === 500) {
        state.error = true;
        state.message = dict.supplier_codes.add_dialog.errors.general.internal;
        return state;
      }

      state.error = true;
      state.message = dict.supplier_codes.add_dialog.errors.general.unknown;
      return state;
    }

    state.message = "everything is a-okay";
    state.result = {
      id: res_body.data.uuid as string,
      code: data.code as string,
      supplier: data.supplier as string,
      item: data.item as string,
      variant: data.variant as string,
    }
  }

  revalidateTag("supplier-codes");
  return state;
}
