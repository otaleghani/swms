export type Zone = {
  id: string;
  name: string;
}
export type ZoneInfo = {
  zone: Zone;
  aisles_count: number;
  items_count: number;
}
export type Aisle = {
  id: string;
  name: string;
  zone: string;
}
export type AisleInfo = {
  aisle: Aisle;
  racks_count: number;
  items_count: number;
}
export type Rack = {
  id: string;
  name: string;
  zone: string;
  aisle: string;
}
export type RackInfo = {
  rack: Rack;
  shelfs_count: number;
  items_count: number;
}
