export type Response<Entity> = {
  code: number;
  message?: string;
  data?: Entity;
}

export type ResponseDataPost = {
  uuid: string;
}

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
