export type Aisle = {
  id?: string;
  name: string;
  zone: string;
};
export type Aisles = Aisle[];

export type AisleExtended = Aisle & {
  racksCount: number;
  itemsCount: number;
};
export type AislesExtended = AislesExtended[];
