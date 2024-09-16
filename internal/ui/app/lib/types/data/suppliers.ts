export type Supplier = {
  id?: string;
  name: string;
  description: string;
}
export type Suppliers = Supplier[];

export type SupplierExtended = Supplier & {
  codesCount: number;
}
export type SuppliersExtended = SupplierExtended[];

