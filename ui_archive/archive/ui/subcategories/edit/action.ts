"use server";

import { Locale, getDictionary } from "@/lib/dictionaries";
import { revalidateTag } from "next/cache";
import { Subcategory } from "@/app/lib/types";
import { putSubcategory } from "@/app/lib/requests/subcategories/put";

export type EditSubcategoryState = {
  error: true | false;
  errorMessages: {
    category: string[];
    description: string[];
    name: string[];
    id: string[];
  };
  message?: string;
}

export async function EditSubcategoryAction(
  currentState: EditSubcategoryState, formData: FormData) {
  const state: EditSubcategoryState = {
    error: false,
    errorMessages: {
      description: [],
      category: [],
      name: [],
      id: [],
    },
    message: "",
  }

  const data = {
    category: formData.get("category"),
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
      state.errorMessages.name.push(dict.subcategories.edit_dialog.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.subcategories.edit_dialog.errors.name.type);
  }

  if (!state.error) {
    const req_body: Subcategory = {
      id: data.id as string,
      name: data.name as string,
      description: data.description as string,
      category: data.category as string,
    }

    const res_body = await putSubcategory(req_body, data.id as string)

    if (res_body.code !== 200) {
      if (res_body.code === 401) {
        state.message = dict.subcategories.edit_dialog.errors.general.auth;
        state.error = true;
      }
      if (res_body.code === 404) {
        state.message = dict.subcategories.edit_dialog.errors.general.not_found;
        state.error = true;
      }
      if (res_body.code === 400) {
        state.message = dict.subcategories.edit_dialog.errors.general.marshal;
        state.error = true;
      }
      if (res_body.code === 500) {
        state.message = dict.subcategories.edit_dialog.errors.general.internal;
        state.error = true;
      }
    } else {
      state.message = dict.subcategories.edit_dialog.success;
      state.error = false;
      revalidateTag("subcategories")
      return state
    }
  }
  return state
}
