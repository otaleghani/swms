import { FormState } from "../form/form";

/** @todo Add more field to describe the client */
export type Client = {
  id?: string;
  name: string;
  surname: string;
  isBusiness?: boolean;
}
export type Clients = Client[];

export type ClientFormState = FormState<"Client">
export const defaultClientFormState: ClientFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    surname: [],
    isBusiness: [],
  }
}

export const emptyClient: Client = {
  id: "",
  name: "",
  surname: "",
  isBusiness: false,
}
