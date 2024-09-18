"use server";

/** Actions */
import fetchData from "../fetch";

/** Consts */
import { revalidateTags } from "../tags";

/** Types and interfaces*/
import { RequestOptions, TypeMap } from "../../types/requests";

/** Maps every possible foreign key request.
  * It's used to map to the TypeMap keys other TypeMap's types.
  * Like saying "I'm getting Aisles from Zone".
  *
  * If there is like a typo the error will be shown in the options const below
  */
type ForeignKeyMap = {
  [K in keyof TypeMap]:
    K extends "Zone" ? "Aisle" | "Rack" | "Shelf" :
    //K extends "ZoneWithExtra" ? "Aisle" | "Rack" | "Shelf" :

    K extends "Aisles" ? "Zone" :
    K extends "Aisle" ? "Rack" | "Shelf" :
    K extends "AislesWithExtra" ? "Zone" :

    K extends "Racks" ? "Zone" | "Aisle" :
    K extends "Rack" ? "Shelf" :
    K extends "RacksWithExtra" ? "Aisle" :

    K extends "Shelfs" ? "Zone" | "Aisle" | "Rack" :
    never;
}

/** Helper type used to create a unique string constant for each pairing.
  */
type ForeignKeyMapCombination = {
  [T in keyof ForeignKeyMap]: ForeignKeyMap[T] extends infer U
    ? U extends string
      ? `${T & string}_${U}`
      : U extends string | number | symbol
      ? `${T & string}_${U & string}`
      : never
    : never;
}[keyof ForeignKeyMap];

/** Helper type that holds every single foreign key request combination and
  * assigns a RequestOption to them 
  */
type ForeignKeyMapOptions = {
  [K in ForeignKeyMapCombination]: RequestOptions;
}

const options: ForeignKeyMapOptions = {
  "Zone_Aisle":           { path: "aisles/{{id}}/zone", type: "Zone" },
  "AislesWithExtra_Zone": { path: "zones/{{id}}/aisles/extra", type: "AislesWithExtra" },
  "Aisles_Zone":          { path: "zones/{{id}}/aisles", type: "Aisles"  },
  "Racks_Zone":           { path: "zones/{{id}}/racks", type: "Racks"  },
  "Racks_Aisle":          { path: "aisles/{{id}}/racks", type: "Racks"  },
}

export default async function getByForeignKey<
  T extends keyof ForeignKeyMap,
  U extends ForeignKeyMap[T] extends Array<keyof TypeMap>
    ? ForeignKeyMap[T][number]
    : ForeignKeyMap[T],
>(
  request: T,
  foreign: U,
  id: string,
) {
  const option = options[
    `${request}_${foreign}` as keyof ForeignKeyMapOptions
  ];

  const response = await fetchData<TypeMap[U]>({
    path: option.path.replace(/{{id}}/g, id),
    method: "GET",
    tag: revalidateTags[option.type],
  })
  return response;
}

