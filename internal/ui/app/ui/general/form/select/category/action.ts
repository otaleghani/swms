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
  if (!state.error) {
    const body = JSON.stringify({
      name: data.name,
      description: data.description,
    })
    const jwt = cookies().get("access")?.value
    const res = await fetch("http://localhost:8080/api/v1/items/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: body,
    })
    const resBody = await res.json();
    
    // AFTER REQUEST VALIDATION
    if (resBody.code === 400) {

    }

    // ERROR HANDLING

    // SUCCESS
    state.message = "everything is a-okay"
    state.result = {
      id: resBody.data.uuid as string,
      name: data.name as string
    }
  }
  return state
}
