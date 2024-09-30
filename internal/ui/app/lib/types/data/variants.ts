import { FormState } from "../form/form";

export type Variant = {
  id?: string;
  name: string;
  description?: string;
  quantity: number;
  identifier: string;
  length?: number;
  width?: number;
  heigth?: number;
  weight?: number;
  isDefaultVariant: boolean;
  item: string;
}
export type Variants = Variant[];

export type VariantFormState = FormState<"Variant">
export const defaultVariantFormState: VariantFormState = {
  error: false,
  message: "",
  errorMessages: {
    id: [],
    name: [],
    description: [],
    quantity: [],
    identifier: [],
    length: [],
    width: [],
    heigth: [],
    weight: [],
    isDefaultVariant: [],
    item: [],
  }
}
