import { FormState } from "../form/form";

export type Subcategory = {
  id?: string;
  name: string;
  description?: string;
  category: string;
}
export type Subcategories = Subcategory[];

export type SubcategoryFormState = FormState<"Subcategory">
export const defaultSubcategoryFormState: SubcategoryFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    description: [],
    category: [],
  },
  result: {
    name: "",
    description: "",
    category: "",
  }
}

export const emptySubcategory: Subcategory = {
  id: "",
  name: "",
  description: "",
  category: "",
}
