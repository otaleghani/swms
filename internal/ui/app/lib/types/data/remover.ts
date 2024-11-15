import { FormState } from "../form/form";

export type RemoveFormState = FormState<"Delete">;

export const defaultRemoveFormState: RemoveFormState = {
  error: false,
  message: "",
  errorMessages: {},
  result: {
    id: "",
    type: "",
  }
}
