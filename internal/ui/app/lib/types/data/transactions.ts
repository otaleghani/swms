import { FormState } from "../form/form";

export type Transaction = {
  id?: string;
  date: string; // date
  quantity: number;

  user: string;
  item: string;
  variant: string;
  ticket?: string;
}
export type Transactions = Transaction[];

export type TransactionFormState = FormState<"Transaction">
export const defaultTransactionFormState: TransactionFormState = {
  error: false,
  message: "",
  errorMessages: {
    quantity: [],
    ticket: [],
  }
}
