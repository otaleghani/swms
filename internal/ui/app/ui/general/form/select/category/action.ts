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
}

export async function AddNewCategory(
  currentState: FormCategoryState, formData: FormData) {
  const state: FormCategoryState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    }
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
      state.errorMessages.name.push(dict.category.form.errors.email.empty);
      state.error = true;
    }
    if (data.name.length > 40) {
      state.errorMessages.name.push(dict.category.form.errors.email.max);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.category.form.errors.email.type)
    state.error = true;
  }

  // DESCRIPTION VALIDATION
  
  // REQUEST
  
  // AFTER REQUEST VALIDATION

  // ERROR HANDLING

  return state
}
