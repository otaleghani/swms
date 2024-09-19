export type Ticket = {
  id?: string;
  name: string;
  description: string;
  open: Date;
  close: Date;
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