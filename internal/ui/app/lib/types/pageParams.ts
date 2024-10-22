export interface DefaultPageProps {
  params: PageParams;
  searchParams: {
    q: string;
  }
}

// Page params
export type PageParams = {
  lang: string;
  id?: string;
}

// Search Params
export type SearchParams = {
  zones?: ZoneSearchParams;
  aisles?: AisleSearchParams;
  //...
}

/** Every type of list that could be pagiated */
export type KeySearchParams = keyof SearchParams;

/** The pagination parameters */
export type PaginationParams = {
  page?: number;
  perPage?: number;
  layout?: number;
}

export type ZoneSearchParams = {
  filters?: ZoneFiltersParams;
  pagination?: PaginationParams;
}

export type AisleSearchParams = {
  filters?: AisleFiltersParams;
  pagination?: PaginationParams;
}

export type RackSearchParams = {
  filters?: {
    search?: string;
    zone?: string;
    aisle?: string;
  }
  pagination?: PaginationParams;
}

export type ShelfSearchParams = {
  filters?: {
    search?: string;
    zone?: string;
    aisle?: string;
    rack?: string;
  }
  pagination?: PaginationParams;
}

export type CategorySearchParams = {
  filters?: {
    search?: string;
  }
  pagination?: PaginationParams;
}

export type SubcategorySearchParams = {}

export interface AllFilters {
  search?: string;
  zone?: string;
  aisle?: string;
}
export type AllFiltersKey = keyof AllFilters;

export type ZoneFiltersParams = {
  [K in keyof AllFilters]: 
    K extends "search" ? AllFilters[K] :
    undefined;
}
export type AisleFiltersParams = {
  [K in keyof AllFilters]: 
    K extends "zone" ? AllFilters[K] :
    K extends "search" ? AllFilters[K] :
    undefined;
}

export type FiltersMap = {
  [K in KeySearchParams]: 
    K extends "zones" ? ZoneFiltersParams :
    K extends "aisles" ? AisleFiltersParams :
    null
}
