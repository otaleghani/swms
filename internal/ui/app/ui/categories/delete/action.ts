"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { deleteCategorySubstitution } from "@/app/lib/requests/categories/delete";
import { redirect } from "next/navigation";

export type DeleteCategoryState = {
  error: true | false;
  errorMessages: {
    id: string[];
    category: string[];
  };
  message?: string;
}

export async function DeleteCategoryAction(
  currentState: DeleteCategoryState, formData: FormData) {
  const state: DeleteCategoryState = {
    error: false,
    errorMessages: {
      id: [],
      category: [],
    },
    message: "",
  }

  const data = {
    id: formData.get("id"),
    category: formData.get("category"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // TO DO
  // error hadling 
  // check if current id actually exist
  // check if sub id actually exist

  if (!state.error) {
    const res_body = await deleteCategorySubstitution(data.id as string, data.category as string)
    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.category.delete_form.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.category.delete_form.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.category.delete_form.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.category.delete_form.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.category.delete_form.success;
      state.error = false;
      revalidateTag("categories");
      redirect("/categories/" + data.category)
      return state;
    }
  }
  return state;
}
