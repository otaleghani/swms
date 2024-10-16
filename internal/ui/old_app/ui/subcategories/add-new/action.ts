"use server";

import { postSubcategory } from "@/app/lib/requests/subcategories/post";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { Subcategory } from "@/app/lib/types";
import { revalidateTag } from "next/cache";

export type AddSubcategoryDialogState = {
  error: true | false;
  errorMessages: {
    name: string[];
    description: string[];
    category: string[];
  };
  message?: string;
  result?: Subcategory;
};

export async function AddSubcategoryDialogAction(
  currentState: AddSubcategoryDialogState, formData: FormData) {
  const state: AddSubcategoryDialogState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      category: [],
    },
  };
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  // VALIDATION
  if (typeof data.name === "string") {
    if (data.name === "" ||
       data.name === undefined) {
      state.errorMessages.name.push(dict.subcategories.add_dialog.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.subcategories.add_dialog.errors.name.type);
    state.error = true;
  }

  // TODO: Add server side validation for zone

  if (!state.error) {
    const res_body = await postSubcategory({
      name: data.name,
      description: data.description,
      category: data.category,
    } as Subcategory);

    if (res_body.code !== 201) {
      if (res_body.code === 401) {
        redirect("/login?error=true");
      }
      if (res_body.code === 400) {
        state.error = true;
        state.message = dict.subcategories.add_dialog.errors.general.marshal;
        return state;
      }
      if (res_body.code === 500) {
        state.error = true;
        state.message = dict.subcategories.add_dialog.errors.general.internal;
        return state;
      }

      state.error = true;
      state.message = dict.subcategories.add_dialog.errors.general.unknown;
      return state;
    }

    state.message = "everything is a-okay";
    state.result = {
      id: res_body.data.uuid as string,
      name: data.name as string,
      description: data.description as string,
      category: data.category as string,
    }
  }

  revalidateTag("subcategories")
  return state;
}
