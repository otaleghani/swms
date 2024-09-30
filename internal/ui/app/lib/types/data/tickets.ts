import { FormState } from "../form/form";

export type Ticket = {
  id?: string;
  name: string;
  description?: string;
  open?: string;   // date
  close?: string;  // date
  client: string;
  product: string;
  type: string;
  state: string;
}
export type Tickets = Ticket[];

export type TicketType = {
  id?: string;
  name: string;
  description: string;
}
export type TicketTypes = TicketType[];

export type TicketState = {
  id?: string;
  name: string;
  description: string;
}
export type TicketStates = TicketState[];

export type TicketFormState = FormState<"Ticket">
export const defaultTicketFormState: TicketFormState = {
  error: false,
  message: "",
  errorMessages: {
    id: [],
    name: [],
    description: [],
    open: [],
    close: [],
    client: [],
    product: [],
    type: [],
    state: [],
  }
}

