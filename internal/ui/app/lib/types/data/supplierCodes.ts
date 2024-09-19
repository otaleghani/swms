import { Item } from "./items";
import { Variant } from "./variants";

export type SupplierCode = {
  id?: string;
  code: string;
  supplier: string;
  item: string;
  variant: string;
}
export type SupplierCodes = SupplierCode[];

export type SupplierCodeWithExtra = SupplierCode & {
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
