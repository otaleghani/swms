export type Response<Entity> = {
  code: number;
  message?: string;

  page?: number;
  perPage?: number;
  totalItems?: number;
  totalPages?: number;

  data?: Entity;
}

export type ResponseDataPost = {
  uuid: string;
}

export type EmptyRP = Promise<Response<undefined>>;

/** General type for a response coming from a POST. */
export type PostRP = Promise<Response<ResponseDataPost>>;

export type MediaPost = {
  item: string;
  blob: string;
}

export type AcceptedLocales = "it" | "en";
