"use server";

import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type FormCategoryState = {
  error: true | false,
  errorMessages: {
    name: string[];
    description: string[];
  }
  message?: string;
  result?: {
    id: string;
    name: string;
  }
}

export async function AddNewCategory(
  currentState: FormCategoryState, formData: FormData) {
  const state: FormCategoryState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    },
  }
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    locale: formData.get("locale"),
  }
  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // NAME VALIDATION
  if (typeof data.name === "string") {
    if (data.name === "" || 
        data.name === undefined) {
      state.errorMessages.name.push(dict.category.form.errors.name.empty);
      state.error = true;
    }
    if (data.name.length > 40) {
      state.errorMessages.name.push(dict.category.form.errors.name.max);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.category.form.errors.name.type)
    state.error = true;
  }

  // DESCRIPTION VALIDATION
  
  // REQUEST
  
  // AFTER REQUEST VALIDATION

  // ERROR HANDLING

  state.message = "everything is a-okay"
  state.result = {
    id: "anvedi",
    name: "something"
  }
  return state
}
