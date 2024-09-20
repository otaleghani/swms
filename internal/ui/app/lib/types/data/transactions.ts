export type Transaction = {
  id?: string;
  date: string; // date
  quantity: number;

  user: string;
  item: string;
  variant: string;
  ticket: string;
}
export type Transactions = Transaction[];
