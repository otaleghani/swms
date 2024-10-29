"use server";

//import { redirect } from "next/navigation";
//import { revalidateTag } from "next/cache";
import { FormMap, FormState } from "../../types/form/form";
import { validateState } from "../validateState";
import { validateUpdateRequests } from "./validateUpdateRequests";

export async function updateFormAction<K extends keyof FormMap>(
  currentState: FormState<K>,
  formData: FormData
) {
  let state = currentState;
  let result = state.result ? state.result : ({} as FormMap[K]);
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

  const stateValidation = await validateState<K>(
    state, 
    type as string, 
    locale as string,
  );

  if (stateValidation.error) { 
    return stateValidation 
  };

  const requestValidation = await validateUpdateRequests<K>(
    state,
    type as string,
    locale as string,
  );

  return requestValidation;
}
