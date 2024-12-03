import { Item } from "./items";
import { Variant } from "./variants";
import { FormState } from "../form/form";

export type SupplierCode = {
  id?: string;
  code: string;
  supplier: string;
  item: string;
  variant: string;
}
export type SupplierCodes = SupplierCode[];

export type SupplierCodeWithExtra = {
  supplierCode: SupplierCode;
  supplierName: string;
}
export type SupplierCodesWithExtra = SupplierCodeWithExtra[];


export type ItemWithSupplierCodes = Item & {
  variants: VariantsWithSupplierCodes;
}
export type VariantWithSupplierCodes = Variant & {
  supplierCodes: SupplierCodes;
}
export type VariantsWithSupplierCodes = VariantWithSupplierCodes[];

export type SupplierCodeFormState = FormState<"SupplierCode">
export const defaultSupplierCodeFormState: SupplierCodeFormState = {
  error: false,
  message: "",
  errorMessages: {
    code: [],
    item: [],
    variant: [],
    supplier: [],
    //supplierWithAdd: [],
  }
}
