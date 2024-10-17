"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { deleteSupplierSubstitution } from "@/app/lib/requests/suppliers/delete";
import { redirect } from "next/navigation";

export type DeleteSupplierState = {
  error: true | false;
  errorMessages: {
    id: string[];
    supplier: string[]
  };
  message?: string;
}

export async function DeleteSupplierAction(
  currentState: DeleteSupplierState, formData: FormData) {
  const state: DeleteSupplierState = {
    error: false,
    errorMessages: {
      id: [],
      supplier: [],
    },
    message: "",
  }

  const data = {
    id: formData.get("id"),
    supplier: formData.get("supplier"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // TO DO
  // error hadling 
  // check if current id actually exist
  // check if sub id actually exist

  if (!state.error) {
    const res_body = await deleteSupplierSubstitution(data.id as string, data.supplier as string)
    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.suppliers.delete_form.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.suppliers.delete_form.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.suppliers.delete_form.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.suppliers.delete_form.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.suppliers.delete_form.success;
      state.error = false;
      revalidateTag("suppliers");
      redirect("/suppliers/" + data.supplier)
      return state;
    }
  }
  return state;
}
