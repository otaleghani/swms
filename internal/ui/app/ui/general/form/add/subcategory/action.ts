"use server";

import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
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
      state.errorMessages.name.push(dict.subcategories.form.errors.name.empty);
      state.error = true;
    }
    if (data.name.length > 40) {
      state.errorMessages.name.push(dict.subcategories.form.errors.name.max);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.subcategories.form.errors.name.type)
    state.error = true;
  }

  // DESCRIPTION VALIDATION
  if (typeof data.description === "string") {
    if (data.description === "" || 
        data.description === undefined) {
      state.errorMessages.description.push(dict.subcategories.form.errors.description.empty);
      state.error = true;
    }
    if (data.description.length < 2) {
      state.errorMessages.description.push(dict.subcategories.form.errors.description.min);
      state.error = true;
    }
    if (data.description.length > 100) {
      state.errorMessages.description.push(dict.subcategories.form.errors.description.max);
      state.error = true;
    }
  } else {
    state.errorMessages.description.push(dict.subcategories.form.errors.description.type)
    state.error = true;
  }
  
  // CATEGORY VALIDATION
  if (typeof data.category === "string") {
    if (data.category === "" || 
        data.category === undefined) {
      state.errorMessages.category.push(dict.subcategories.form.errors.category.empty);
      state.error = true;
    }
    
    // Checks if the category exists
    const jwt = cookies().get("access")?.value
    const categoryCheck = await fetch(`http://localhost:8080/api/v1/categories/${data.category}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    });

    const resCategoryBody = await categoryCheck.json();

    if (resCategoryBody.code !== 200) {
      if (resCategoryBody.code === 404) {
        state.errorMessages.category.push(dict.subcategories.form.errors.category.not_found);
        state.error = true;
      }
      if (resCategoryBody.code === 401) {
        redirect("/login?error=true");
      }
    }
  } else {
    state.errorMessages.category.push(dict.subcategories.form.errors.category.type)
    state.error = true;
  }

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
    
    if (resBody.code !== 201) {
      // not authorized
      if (resBody.code === 401) {
        redirect("/login?error=true");
      }

      // malformed request (marshal failure)
      if (resBody.code === 400) {
        state.error = true;
        state.message = dict.subcategories.form.errors.general.marshal;
        return state
      }

      if (resBody.code === 500) {
        state.error = true;
        state.message = dict.subcategories.form.errors.general.internal;
        return state
      }

      state.error = true;
      state.message = dict.subcategories.form.errors.general.unknown;
      return state
    }

    // SUCCESS
    state.message = "everything is a-okay";
    state.result = {
      id: resBody.data.uuid as string,
      name: data.name as string,
      category: data.category as string,
    }
  }

  return state
}

