export type Variant = {
  id?: string;
  name: string;
  description: string;
  quantity: number;
  identifier: string;
  length: number;
  width: number;
  heigth: number;
  weight: number;
  defaultVariant: boolean;
  item: string;
}
export type Variants = Variant[];
