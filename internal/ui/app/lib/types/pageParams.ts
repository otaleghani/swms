export interface DefaultPageProps {
  params: {
    lang: string;
    id?: string;
  },
  searchParams: {
    page: number;
    perPage: number;
  }
}

export type PaginationParams = {
  page: number;
  perPage: number;
}

export type ZoneSearchParams = {
  filters: {
    search: string;
  }
  pagination: PaginationParams;
}

export type AisleSearchParams = {
  filters: {
    search: string;
    zone: string;
  }
  pagination: PaginationParams;
}

export type RackSearchParams = {
  filters: {
    search: string;
    zone: string;
    aisle: string;
  }
  pagination: PaginationParams;
}

export type ShelfSearchParams = {
  filters: {
    search: string;
    zone: string;
    aisle: string;
    rack: string;
  }
  pagination: PaginationParams;
}

export type CategorySearchParams = {
  filters: {
    search: string;
  }
  pagination: PaginationParams;
}

export type SubcategorySearchParams = {

}
