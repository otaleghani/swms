import { FormState } from "../form/form";

export type Variant = {
  id?: string;
  name: string;
  description?: string;
  quantity: number;
  identifier: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  isDefaultVariant: boolean;
  item: string;

  lengthUnit?: string;
  weightUnit?: string;
  //widthUnit?: string;
  //heightUnit?: string;
}
export type Variants = Variant[];

export const emptyVariant: Variant = {
  id: "",
  name: "",
  description: "",
  quantity: 0,
  identifier: "",
  length: 0,
  width: 0,
  height: 0,
  weight: 0,
  isDefaultVariant: false,
  item: "",
}

export type VariantFormState = FormState<"Variant">
export const defaultVariantFormState: VariantFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    description: [],
    quantity: [],
    identifier: [],
    length: [],
    width: [],
    height: [],
    weight: [],

    //item: [],
    //isDefaultVariant: [],
  }
}
