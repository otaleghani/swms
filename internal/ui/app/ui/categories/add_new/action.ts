"use server";

import { postCategory } from "@/app/lib/requests/categories/post";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { Category } from "@/app/lib/types";
import { revalidateTag } from "next/cache";

export type AddCategoryDialogState = {
  error: true | false;
  errorMessages: {
    name: string[];
    description: string[];
  };
  message?: string;
  result?: Category;
};

export async function AddCategoryDialogAction(
  currentState: AddCategoryDialogState, formData: FormData) {
  const state: AddCategoryDialogState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    },
  };
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  // VALIDATION
  if (typeof data.name === "string") {
    if (data.name === "" ||
       data.name === undefined) {
      state.errorMessages.name.push(dict.categories.add_dialog.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.categories.add_dialog.errors.name.type);
    state.error = true;
  }

  // TODO: Add server side validation for zone

  if (!state.error) {
    const res_body = await postCategory({
      name: data.name,
      description: data.description,
    } as Category);

    if (res_body.code !== 201) {
      if (res_body.code === 401) {
        redirect("/login?error=true");
      }
      if (res_body.code === 400) {
        state.error = true;
        state.message = dict.categories.add_dialog.errors.general.marshal;
        return state;
      }
      if (res_body.code === 500) {
        state.error = true;
        state.message = dict.categories.add_dialog.errors.general.internal;
        return state;
      }

      state.error = true;
      state.message = dict.categories.add_dialog.errors.general.unknown;
      return state;
    }

    state.message = "everything is a-okay";
    state.result = {
      id: res_body.data.uuid as string,
      name: data.name as string,
      description: data.description as string,
    }
  }

  revalidateTag("categories")
  return state;
}
