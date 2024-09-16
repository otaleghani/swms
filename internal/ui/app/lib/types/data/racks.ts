export type Rack = {
  id?: string;
  name: string;
  zone: string;
  aisle: string;
};
export type Racks = Rack[];

export type RackExtended = Rack & {
  shelfsCount: number;
  itemsCount: number;
};
export type RacksExtended = RackExtended[];
