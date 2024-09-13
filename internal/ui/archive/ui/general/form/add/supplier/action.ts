"use server";

import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Supplier } from "@/app/lib/types";
import validateString from "../../validation/strings";
import { postSupplier } from "@/app/lib/requests/suppliers/post";
import validateResponse from "../../validation/request";

export type FormSupplierState = {
  error: true | false,
  errorMessages: {
    name: string[];
    description: string[];
  }
  message?: string;
  result?: Supplier;
}

export async function AddSupplierAction(
  currentState: FormSupplierState, formData: FormData) {
  const state: FormSupplierState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    },
  }
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    locale: formData.get("locale") as string,
  }
  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ]);

  /** Validation */
  (state.errorMessages.name = validateString(
    data.name, 
    dict.forms.fields.name.validation, 2, 20
  )).length != 0 && (state.error = true);

  (state.errorMessages.description = validateString(
    data.description, 
    dict.forms.fields.description.validation, 2, 20
  )).length != 0 && (state.error = true);

  /** Request*/
  if (!state.error) {
    const supplier: Supplier = {
      name: data.name,
      description: data.description,
    }
    const response = await postSupplier(supplier)
    const validation = validateResponse({
      dict: dict.forms.messages,
      response: response,
    });

    if (validation.error) {
      state.error = true;
      state.message = validation.message;
      return state;
    }

    state.message = validation.message;
    state.result = {
      id: response.data.uuid as string,
      name: data.name,
      description: data.description,
    }
  }
  return state
}
