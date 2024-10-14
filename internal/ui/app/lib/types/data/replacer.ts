import { FormState } from "../form/form";

export type ReplaceFormState = FormState<"Replace">;

export const defaultReplaceFormState: ReplaceFormState = {
  error: false,
  message: "",
  errorMessages: {
    zone: [],
    aisle: [],
    rack: [],
    shelf: [],
    category: [],
    subcategory: [],
    id: [],
  }
}
