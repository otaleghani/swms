"use server";

import { FormMap, FormState } from "../../types/form/form";
import { validateState } from "../validateState";

export async function deleteFormAction(
  currentState: FormState<"Delete">,
  formData: FormData
) {
  let state = currentState;
  let result = state.result ? state.result : ({} as FormMap["Delete"]);
  let locale = formData.get("locale");
  let type = formData.get("type");
  let id = formData.get("id");

  state.result = {
    id: id as string,
    type: type as string,
  }

  const stateValidation = validateState<"Delete">(
    state,
    type as string,
    locale as string
  );
}
