"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { deleteSubcategorySubstitution } from "@/app/lib/requests/subcategories/delete";
import { redirect } from "next/navigation";

export type DeleteSubcategoryState = {
  error: true | false;
  errorMessages: {
    id: string[];
    subcategory: string[];
  };
  message?: string;
}

export async function DeleteSubcategoryAction(
  currentState: DeleteSubcategoryState, formData: FormData) {
  const state: DeleteSubcategoryState = {
    error: false,
    errorMessages: {
      id: [],
      subcategory: [],
    },
    message: "",
  }

  const data = {
    id: formData.get("id"),
    subcategory: formData.get("subcategory"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // TO DO
  // error hadling 
  // check if current id actually exist
  // check if sub id actually exist

  if (!state.error) {
    const res_body = await deleteSubcategorySubstitution(data.id as string, data.subcategory as string)
    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.subctegories.delete_dialog.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.subcategories.delete_dialog.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.subcategories.delete_dialog.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.subcategories.delete_dialog.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.subcategories.delete_dialog.success;
      state.error = false;
      revalidateTag("subcategories");
      redirect("/subcategories/" + data.subcategory)
      return state;
    }
  }
  return state;
}
