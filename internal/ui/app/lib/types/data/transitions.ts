export type Transition = {
  id?: string;
  date: Date;
  quantity: number;

  user: string;
  item: string;
  variant: string;
  ticket: string;
}
export type Transitions = Transition[];
