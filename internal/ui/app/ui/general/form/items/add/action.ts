"use server";

export type FormItemsAddState = {
  error: true | false,
  errorMessages: {
    name: string[];
    description: string[];
    category: string[];
    subcategory: string[];
  }
  message?: string;
  result?: {
    category: string;
    subcategory: string;
  }
}

export async function AddNewItem(
  currentState: FormItemsAddState, formData: FormData) {
  const state: FormItemsAddState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      category: [],
      subcategory: [],
    },
  } 

  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    subcategory: formData.get("subcategory")
  }

  console.log(data);

  return state;
}
