export type Shelf = {
  id?: string;
  name: string;
  zone: string;
  aisle: string;
  rack: string;
};
export type Shelfs = Shelf[];

export type ShelfExtended = Shelf & {
  itemsCount: number;
};
export type ShelfsExtended = ShelfExtended[];
