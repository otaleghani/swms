"use server";

import { getDictionary, Locale } from "@/lib/dictionaries";
import { Variant } from "@/app/lib/types";
import validateString from "../../general/form/validation/strings";
import validateNumbers from "../../general/form/validation/number";
//import validateResponse from "../../general/form/validation/request";
//import validateItem from "../../general/form/validation/items";

export type AddVariantFieldState = {
  error: true | false;
  errorMessages: {
    name: string[];
    description: string[];
    internalId: string[];
    quantity: string[];
    width: string[];
    height: string[];
    length: string[];
    weight: string[];
    item: string[];
  };
  message?: string;
  result?: Variant;
}; 

export async function AddVariantFieldAction(
  currentState: AddVariantFieldState, formData: FormData) {
  const state: AddVariantFieldState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      internalId: [],
      quantity: [],
      width: [],
      height: [],
      length: [],
      weight: [],
      item: [],
    },
    message: "",
  }

  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    internalId: formData.get("internalId") as string,
    quantity: formData.get("quantity"),
    width: formData.get("width") as string,
    height: formData.get("height") as string,
    length: formData.get("length") as string,
    weight: formData.get("weight") as string,
    item: formData.get("item") as string,
    locale: formData.get("locale") as string,
  }

  const dictPromise = getDictionary(data.locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

/** Validation */
  (state.errorMessages.name = validateString(
    data.name as string, dict.form.validation.name, 2, 20
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.description = validateString(
    data.description as string, dict.form.validation.description, -1, 100
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.quantity = validateNumbers(
    data.quantity as string, dict, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.width = validateNumbers(
    data.width as string, dict, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.height = validateNumbers(
    data.height as string, dict, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.length = validateNumbers(
    data.length as string, dict, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  (state.errorMessages.weight = validateNumbers(
    data.weight as string, dict, -1, 9999999
  )).length != 0 ? (state.error = true) : (state.error = false);

  if (state.error) {
    state.message = dict.variants.errors.ohoh
    return state;
  }

  // if everything went well we can return a variant

  state.result = {
    name: data.name,
    description: data.description,
    internalId: data.internalId,
    quantity: Number(data.quantity),
    width: Number(data.width),
    heigth: Number(data.height),
    length: Number(data.length),
    weight: Number(data.weight),
    item: data.item,
  } as Variant;

  state.message = dict.form.messages.success.post;
  return state;
}
