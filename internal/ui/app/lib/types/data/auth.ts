import { FormState } from "../../types/form/form";

export type LoginResponseBody = {
  accessToken: string;
  refreshToken: string;
}

export type LoginRequestBody = {
  email: string;
  password: string;
}

export type RegisterRequestBody = {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export type LoginFormState = FormState<"Login">;
export type RegisterFormState = FormState<"Register">;

export const defaultLoginState: LoginFormState = {
  error: false,
  message: "",
  errorMessages: {
    email: [],
    password: [],
  },
  result: {
    email: "",
    password: "",
  }
}

export const defaultRegisterState: RegisterFormState = {
  error: false,
  message: "",
  errorMessages: {
    email: [],
    password: [],
    name: [],
    surname: [],
  },
  result: {
    name: "",
    surname: "",
    email: "",
    password: "",
  }
}
