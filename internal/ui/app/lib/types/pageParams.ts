import { Filters } from "./query/data";

export interface DefaultPageProps {
  params: PageParams;
  searchParams: {
    q: string;
  };
};

export type PageParams = {
  lang: string;
  id?: string;
};

// prettier-ignore
export type SearchParams = {
  [K in keyof Filters]?: {
    filters?: Filters[K];
    pagination?: PaginationParams;
  };
};

/** The pagination parameters */
export type PaginationParams = {
  page?: number;
  perPage?: number;
  layout?: number;
};
