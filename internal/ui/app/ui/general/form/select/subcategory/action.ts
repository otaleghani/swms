export type FormSubcategoryState = {
  error: true | false,
  errorMessages: {
    name: string[];
    description: string[];
  }
  message?: string;
  result?: {
    id: string;
    name: string;
  }
}

export function AddNewSubcategory(initialState: FormSubcategoryState, formData: FormData) {
  const result = {error: false, message: "", result: {id: "", name: ""}}
  return result
}
