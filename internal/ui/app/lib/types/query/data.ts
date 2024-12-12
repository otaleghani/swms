/** Describes all the possible filters */
export interface FiltersParams {
  search?: string;        
  zone?: string;
  aisle?: string;
  rack?: string;
  shelf?: string;
  category?: string;
  subcategory?: string;
  item?: string;
  variant?: string;
  isBusiness?: string;
  isArchived?: string;
  client?: string;
  supplier?: string;
  open?: string;
  close?: string;
  date?: string;
  product?: string;
  ticket?: string;
  ticketType?: string;
  ticketState?: string;
  user?: string;
  description?: string;
};

export type Filters = {
  zones: ZoneFiltersParams;
  aisles: AisleFiltersParams;
  racks: RackFiltersParams;
  shelfs: ShelfFiltersParams;
  categories: CategoryFiltersParams;
  subcategories: SubcategoryFiltersParams;
  clients: ClientFiltersParams;
  items: ItemFiltersParams;
  products: ProductFiltersParams;
  suppliers: SupplierFiltersParams;
  supplierCodes: SupplierCodeFiltersParams;
  tickets: TicketFiltersParams;
  operations: OperationsFiltersParams;
  variants: VariantFiltersParams;
};

// prettier-ignore
export type ZoneFiltersParams = {
  [K in keyof FiltersParams]: 
    K extends "search" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type AisleFiltersParams = {
  [K in keyof FiltersParams]: 
    K extends "search" ? FiltersParams[K] :
    K extends "zone" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type RackFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    K extends "zone" ? FiltersParams[K] :
    K extends "aisle" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type ShelfFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    K extends "zone" ? FiltersParams[K] :
    K extends "aisle" ? FiltersParams[K] :
    K extends "rack" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type CategoryFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type SubcategoryFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    K extends "category" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type ClientFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    K extends "isBusiness" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type ItemFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    K extends "isArchived" ? FiltersParams[K] :
    K extends "zone" ? FiltersParams[K] :
    K extends "aisle" ? FiltersParams[K] :
    K extends "rack" ? FiltersParams[K] :
    K extends "shelf" ? FiltersParams[K] :
    K extends "category" ? FiltersParams[K] :
    K extends "subcategory" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type ProductFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    K extends "client" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type SupplierFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type SupplierCodeFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    K extends "supplier" ? FiltersParams[K] :
    K extends "item" ? FiltersParams[K] :
    K extends "variant" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type TicketFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    K extends "open" ? FiltersParams[K] :
    K extends "close" ? FiltersParams[K] :
    K extends "client" ? FiltersParams[K] :
    K extends "product" ? FiltersParams[K] :
    K extends "ticketType" ? FiltersParams[K] :
    K extends "ticketState" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type OperationsFiltersParams = {
  [K in keyof FiltersParams]:
    K extends "search" ? FiltersParams[K] :
    K extends "user" ? FiltersParams[K] :
    K extends "item" ? FiltersParams[K] :
    K extends "variant" ? FiltersParams[K] :
    K extends "ticket" ? FiltersParams[K] :
    K extends "date" ? FiltersParams[K] :
    undefined;
};

// prettier-ignore
export type VariantFiltersParams = {
  [K in keyof FiltersParams]: 
    K extends "search" ? FiltersParams[K] :
    K extends "item" ? FiltersParams[K] :
    undefined;
};
