// POSITION
export type Zone = {
  id: string;
  name: string;
}
export type ZoneInfo = {
  zone: Zone;
  aisles_count: number;
  items_count: number;
}
export type Aisle = {
  id: string;
  name: string;
  zone: string;
}
export type AisleInfo = {
  aisle: Aisle;
  racks_count: number;
  items_count: number;
}
export type Rack = {
  id: string;
  name: string;
  zone: string;
  aisle: string;
}
export type RackInfo = {
  rack: Rack;
  shelfs_count: number;
  items_count: number;
}
export type Shelf = {
  id: string;
  name: string;
  zone: string;
  aisle: string;
  rack: string;
}
export type ShelfInfo = {
  shelf: Shelf;
  items_count: number;
}

// SUPPLIER
export type Supplier = {
  id: string;
  name: string;
  description: string;
}
export type SupplierInfo = {
  supplier: Supplier;
  codes_count: number;
}
export type SupplierCode = {
  id: string;
  code: string;
  supplier: string;
  item: string;
  variant: string;
}
export type SupplierCodeInfo = {
  supplier_code: SupplierCode;
  supplier_name: string;
}
export type ItemAndSupplierCodes = {
  item: Item;
  codes: SupplierCode[];
}

// ITEMS
export type Item = {
  id: string;
  name: string;
  description: string;
  archive: boolean;
  zone: string;
  aisle: string;
  rack: string;
  shelf: string;
  category: string;
  subcategory: string;
}
