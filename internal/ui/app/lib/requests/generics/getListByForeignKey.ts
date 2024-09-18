"use server";

import { Zone, Zones, ZonesWithExtra } from "../../types/data/zones";
import { Aisles, AislesWithExtra } from "../../types/data/aisles";
import { Racks, RacksWithExtra } from "../../types/data/racks";
import { Shelfs, ShelfsWithExtra} from "../../types/data/shelfs";
import { RequestOptions } from "../../types/misc";

import fetchData from "../fetch";
import { Response } from "@/app/lib/types/misc";
import { tags } from "../tags";

interface TypeMap {
  Zone: Zone;
  Zones: Zones;
  ZonesWithExtra: ZonesWithExtra;
  Aisles: Aisles;
  Racks: Racks;
  Shelfs: Shelfs;
}


// This is the mapping that would be called on the function
interface ForeignKeyMap {
  Aisles: "Zone";
  Racks: "Zone" | "Aisle";
}

//type ForeignKeyMap = {
//  [Entity in keyof TypeMap]?: keyof TypeMap | Array<keyof TypeMap>;
//};
////type ForeignKeyMap = {
//  Aisles: "Zone",
//}

type AllCombinationKeys = {
  [T in keyof ForeignKeyMap]: ForeignKeyMap[T] extends infer U
    ? U extends string
      ? `${T & string}_${U}`
      : U extends string | number | symbol
      ? `${T & string}_${U & string}`
      : never
    : never;
}[keyof ForeignKeyMap];

type CombinationRecod = {
  [K in AllCombinationKeys]: {
    path: string,
  }
}

const combinations: CombinationRecod = {
  "Aisles_Zone": { path: "" },
  "Racks_Zone":  { path: "" },
  "Racks_Aisle": { path: "" },
}

console.log(combinations)

export default async function getListByForeignKey<
  T extends keyof ForeignKeyMap,
  U extends ForeignKeyMap[T],
>(
  list: T,
  item: U,
  id: string,
) {
  

}

getListByForeignKey("Aisles", "Zone"
