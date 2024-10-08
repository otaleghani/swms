import { FormState } from "../form/form";

export type Category = {
  id?: string;
  name: string;
  description?: string;
}
export type Categories = Category[];

export type CategoryFormState = FormState<"Category">
export const defaultCategoryFormState: CategoryFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    description: [],
  }
}

export const emptyCategory: Category = {
  id: "",
  name: "",
  description: "",
}
