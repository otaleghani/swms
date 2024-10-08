"use server";

import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Category } from "@/app/lib/types";

export type FormCategoryState = {
  error: true | false,
  errorMessages: {
    name: string[];
    description: string[];
  }
  message?: string;
  result?: Category;
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
      state.errorMessages.name.push(dict.categories.form.errors.name.empty);
      state.error = true;
    }
    if (data.name.length > 40) {
      state.errorMessages.name.push(dict.categories.form.errors.name.max);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.categories.form.errors.name.type)
    state.error = true;
  }

  // DESCRIPTION VALIDATION
  if (typeof data.description === "string") {
    if (data.description === "" || 
        data.description === undefined) {
      state.errorMessages.description.push(dict.categories.form.errors.description.empty);
      state.error = true;
    }
    if (data.description.length < 2) {
      state.errorMessages.description.push(dict.categories.form.errors.description.min);
      state.error = true;
    }
    if (data.description.length > 100) {
      state.errorMessages.description.push(dict.categories.form.errors.description.max);
      state.error = true;
    }
  } else {
    state.errorMessages.description.push(dict.categories.form.errors.description.type)
    state.error = true;
  }
  
  // REQUEST
  if (!state.error) {
    const body = JSON.stringify({
      name: data.name,
      description: data.description,
    })
    const jwt = cookies().get("access")?.value
    const res = await fetch("http://localhost:8080/api/v1/categories/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: body,
    })
    const resBody = await res.json();
    

    // AFTER REQUEST VALIDATION
    if (resBody.code !== 201) {
      // not authorized
      if (resBody.code === 401) {
        redirect("/login?error=true");
      }

      // malformed request (marshal failure)
      if (resBody.code === 400) {
        state.error = true;
        state.message = dict.categories.form.errors.general.marshal;
        return state
      }

      if (resBody.code === 500) {
        state.error = true;
        state.message = dict.categories.form.errors.general.internal;
        return state
      }

      state.error = true;
      state.message = dict.categories.form.errors.general.unknown;
      return state
    }

    // SUCCESS
    state.message = "everything is a-okay"
    state.result = {
      id: resBody.data.uuid as string,
      name: data.name as string,
      description: data.description as string
    }
  }

  return state
}
