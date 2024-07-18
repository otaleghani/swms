"use server";

import { getDictionary, Locale } from "@/lib/dictionaries";
import { cookies } from "next/headers";

export type FormSubcategoryState = {
  error: true | false,
  errorMessages: {
    name: string[];
    description: string[];
    category: string[];
  }
  message?: string;
  result?: {
    id: string;
    name: string;
    category: string;
  }
}

export async function AddNewSubcategory(
  initialState: FormSubcategoryState, formData: FormData) {
  const state: FormSubcategoryState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      category: [],
    },
  };
  const data = {
    locale: formData.get("locale"),
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category")
  }
  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // NAME VALIDATION
  if (typeof data.name === "string") {
    if (data.name === "" || 
        data.name === undefined) {
      state.errorMessages.name.push(dict.subcategory.form.errors.name.empty);
      state.error = true;
    }
    if (data.name.length > 40) {
      state.errorMessages.name.push(dict.subcategory.form.errors.name.max);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.subcategory.form.errors.name.type)
    state.error = true;
  }

  // DESCRIPTION VALIDATION
  
  // CATEGORY VALIDATION
  // is it a string?
  // does it exists?

  // REQUEST
  if (!state.error) {
    const body = JSON.stringify({
      name: data.name,
      description: data.description,
      category: data.category,
    })
    const jwt = cookies().get("access")?.value
    const res = await fetch("http://localhost:8080/api/v1/subcategories/", {
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
    state.message = "everything is a-okay";
    state.result = {
      id: resBody.data.uuid as string,
      name: data.name as string,
      category: data.category as string,
    };
  }
  return state
}

