import { FormState } from "../form/form";
import { Variant } from "./variants";

export type Item = {
  id?: string;
  name: string;
  description?: string;
  isArchived: boolean;
  zone?: string;
  aisle?: string;
  rack?: string;
  shelf?: string;
  category?: string;
  subcategory?: string;
}
export type Items = Item[];

export const emptyItem: Item = {
  id: "",
  name: "",
  description: "",
  isArchived: false,
  zone: "",
  aisle: "",
  rack: "",
  shelf: "",
  category: "",
  subcategory: "",
}

export type ItemFormState = FormState<"Item">
export const defaultItemFormState: ItemFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    description: [],
    isArchived: [],
    zoneWithAdd: [],
    aisleWithAdd: [],
    rackWithAdd: [],
    shelfWithAdd: [],
    categoryWithAdd: [],
    subcategoryWithAdd: [],
  }
}

export type ItemCompleteFormState = FormState<"ItemComplete">
export const defaultItemCompleteFormState: ItemCompleteFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    description: [],
    isArchived: [],
    zoneWithAdd: [],
    aisleWithAdd: [],
    rackWithAdd: [],
    shelfWithAdd: [],
    categoryWithAdd: [],
    subcategoryWithAdd: [],
    images: [],
    identifier: [],
    quantity: [],
    length: [],
    width: [],
    height: [],
    weight: [],
    variantsJSON: [],
    codesJSON: [],
    lengthUnit: [],
    weightUnit: [],
  },
  result: {
    id: "",
    name: "",
    description: "",
    isArchived: false,
    zone: "",
    aisle: "",
    rack: "",
    shelf: "",
    category: "",
    subcategory: "",
    identifier: "",
    quantity: 0,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    images: [],
    isDefaultVariant: true,
    item: "",
    encodedImages: [],
    variantsJSON: "",
    codesJSON: "",
    weightUnit: "",
    lengthUnit: "",
  }
}

export type ItemWithDefaultVariantAndImages = Item & Variant & {
  images: File[];
  encodedImages: string[];
  variantsJSON: string;
  codesJSON: string;
}
