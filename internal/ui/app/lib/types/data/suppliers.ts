import { FormState } from "../form/form";

export type Supplier = {
  id?: string;
  name: string;
  description?: string;
}
export type Suppliers = Supplier[];

export type SupplierWithExtra = {
  supplier: Supplier;
  codesCount: number
}
export type SuppliersWithExtra = SupplierWithExtra[];

export type SupplierFormState = FormState<"Supplier">
export const defaultSupplierFormState: SupplierFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    description: [],
  },
  result: {
    id: "",
    name: "",
    description: "",
  }
}

export const emptySupplier: Supplier = {
  id: "",
  name: "",
  description: "",
}
