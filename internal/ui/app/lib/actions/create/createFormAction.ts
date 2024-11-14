"use server";

import { FormMap, FormState } from "../../types/form/form";
import { validateState } from "../validateState";
import { validateCreateRequests } from "./validateCreateRequests";

export async function createFormAction<K extends keyof FormMap>(
  currentState: FormState<K>,
  formData: FormData
) {
  let state = currentState;
  let result = state.result as FormMap[K]; 
  let locale = formData.get("locale");
  let type = formData.get("type");

  formData.forEach((value, key) => {
    if (key in result) {
      const currentValue = (result as any)[key];
      if (typeof currentValue === "number") {
        (result as any)[key] = Number(value);
      } else if (typeof currentValue === "boolean") {
        (result as any)[key] = value === "true" || value === "on";
      } else {
        (result as any)[key] = value;
      }
    }
  });
  state.result = result;
  state.error = false;

  const stateValidation = await validateState<K>(
    state, 
    type as string, 
    locale as string,
  );

  if (stateValidation.error) { 
    return stateValidation 
  };

  const requestValidation = await validateCreateRequests<K>(
    state,
    type as string,
    locale as string,
  );

  return requestValidation;
}
