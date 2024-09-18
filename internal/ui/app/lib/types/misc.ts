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

export interface FormState<Type> {
  error: boolean;
  message: string
  result?: Type;
  errorMessages: {
    [K in keyof Type]: string[];
  }
}

