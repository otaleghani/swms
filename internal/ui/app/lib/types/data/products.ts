import { FormState } from "../form/form";

export type Product = {
  id?: string;
  name: string;
  description?: string;
  client?: string;
}
export type Products = Product[];

export type ProductFormState = FormState<"Product">
export const defaultProductFormState: ProductFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    description: [],
    clientWithAdd: [],
    images: [],
  }
}

export type ProductWithImages = Product & {
  images: null;
}

export const emptyProduct: Product = {
  id: "",
  name: "",
  description: "",
  client: "",
}
