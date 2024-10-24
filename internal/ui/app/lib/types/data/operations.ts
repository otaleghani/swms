import { FormState } from "../form/form";

export type Operation = {
  id?: string;
  date: string; // date
  quantity: number;

  user: string;
  item: string;
  variant: string;
  ticket?: string;
}
export type Operations = Operation[];

export type OperationFormState = FormState<"Operation">
export const defaultOperationFormState: OperationFormState = {
  error: false,
  message: "",
  errorMessages: {
    quantity: [],
    ticket: [],
  }
}
