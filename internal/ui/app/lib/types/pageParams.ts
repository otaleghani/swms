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
export type PaginationType = keyof SearchParams;

/** The pagination parameters */
export type PaginationParams = {
  page?: number;
  perPage?: number;
  layout?: number;
}

export type ZoneSearchParams = {
  filters?: {
    search?: string;
  }
  pagination?: PaginationParams;
}

export type AisleSearchParams = {
  filters?: {
    search?: string;
    zone?: string;
  }
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

export type SubcategorySearchParams = {

}
