export type Supplier = {
  id?: string;
  name: string;
  description: string;
}
export type Suppliers = Supplier[];

export type SupplierWithExtra = Supplier & {
  codesCount: number;
}
export type SuppliersWithExtra = SupplierWithExtra[];

