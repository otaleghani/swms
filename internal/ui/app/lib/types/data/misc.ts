export type Response = {
  code: number;
  message?: string;
  data?: any;
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
