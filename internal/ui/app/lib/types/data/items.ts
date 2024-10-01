import { FormState } from "../form/form";
import { Variant, Variants } from "./variants";
import { SupplierCodes } from "./supplierCodes";
import { ItemImage } from "./images";

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

export type ItemFormState = FormState<"Item">
export const defaultItemFormState: ItemFormState = {
  error: false,
  message: "",
  errorMessages: {
    id: [],
    name: [],
    description: [],
    isArchived: [],
    zone: [],
    aisle: [],
    rack: [],
    shelf: [],
    category: [],
    subcategory: [],
  }
}

export type ItemComplete = Item & Variant & {
  //defaultVariant: Variant;
  //variants: Variants;
  images: ItemImage;
  //variants: Variants;
  //variantsCodes: SupplierCodes;
}
