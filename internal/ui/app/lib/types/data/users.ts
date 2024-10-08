import { FormState } from "../form/form";

export type User = {
  id?: string;
  name?: string;
  surname?: string;
  email: string;
}
export type Users = User[];

export type UserFormState = FormState<"User">
export const defaultUserFormState: UserFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    surname: [],
    email: [],
  }
}

export const emptyUser: User = {
  id: "",
  name: "",
  surname: "",
  email: "",
}
