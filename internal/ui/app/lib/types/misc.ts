export type Response<Entity> = {
  code: number;
  message?: string;
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

export interface DefaultPageProps {
  params: {
    lang: string;
  }
}

export type AcceptedLocales = "it" | "en"
