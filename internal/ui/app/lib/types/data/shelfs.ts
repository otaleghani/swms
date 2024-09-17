export type Shelf = {
  id?: string;
  name: string;
  zone: string;
  aisle: string;
  rack: string;
};
export type Shelfs = Shelf[];

export type ShelfWithExtra = Shelf & {
  itemsCount: number;
};
export type ShelfsWithExtra = ShelfWithExtra[];
