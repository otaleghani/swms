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
type ForeignTypeMap = {
  [K in keyof TypeMap]:
    K extends "Zone" ? "Aisle" | "Rack" | "Shelf" :

    K extends "Aisle" ? "Rack" | "Shelf" :
    K extends "Aisles" ? "Zone" :
    K extends "AislesWithExtra" ? "Zone" :

    K extends "Rack" ? "Shelf" :
    K extends "Racks" ? "Zone" | "Aisle" :
    K extends "RacksWithExtra" ? "Aisle" :

    //K extends "Shelfs" ? "Zone" | "Aisle" | "Rack" :

    K extends "SubcategoryWithExtra" ? "Category" :

    // K extends "SupplierCodes" ? "Supplier" :
    K extends "ItemWithSupplierCodes" ? "Supplier" :
    never;
}

/** Helper type used to create a unique string constant for each pairing.
  */
type ForeignTypeMapCombination = {
  [T in keyof ForeignTypeMap]: ForeignTypeMap[T] extends infer U
    ? U extends string
      ? `${T & string}_${U}`
      : U extends string | number | symbol
      ? `${T & string}_${U & string}`
      : never
    : never;
}[keyof ForeignTypeMap];

/** Helper type that holds every single foreign key request combination and
  * assigns a RequestOption to them 
  */
type MapOptions = {
  [K in ForeignTypeMapCombination]: RequestOptions;
}

const options: MapOptions = {
  "Zone_Aisle":             { path: "aisles/{{id}}/zone", type: "Zone" },
  "Zone_Rack":              { path: "racks/{{id}}/zone", type: "Zone" },
  "Zone_Shelf":             { path: "shelfs/{{id}}/zone", type: "Zone" },

  "Aisle_Rack":             { path: "racks/{{id}}/aisle", type: "Aisle" },
  "Aisle_Shelf":            { path: "shelfs/{{id}}/aisle", type: "Aisle" },
  "Aisles_Zone":            { path: "zones/{{id}}/aisles", type: "Aisles"  },
  "AislesWithExtra_Zone":   { path: "zones/{{id}}/aisles/extra", type: "AislesWithExtra" },

  "Rack_Shelf":             { path: "shelfs/{{id}}/rack", type: "Rack" },
  "Racks_Zone":             { path: "zones/{{id}}/racks", type: "Racks"  },
  "Racks_Aisle":            { path: "aisles/{{id}}/racks", type: "Racks"  },
  "RacksWithExtra_Aisle":   { path: "aisles/{{id}}/racks/extra", type: "RacksWithExtra" },

  //"Shelfs_Rack":            { path: "aisles/{{id}}/racks", type: "Racks"  },
  //"Shelfs_Aisle":           { path: "aisles/{{id}}/racks", type: "Racks"  },
  //"Shelfs_Zone":            { path: "aisles/{{id}}/racks", type: "Racks"  },
  
  "SubcategoryWithExtra_Category": { path: "category/{{id}}/subcategories/extra", type: "Subcategories"},

  //"SupplierCodes_Supplier": { path: "aisles/{{id}}/racks", type: "Racks"  },
  "ItemWithSupplierCodes_Supplier": { 
    path: "supplier/{{id}}/codes",
    type: "SupplierCodes"
  }
}

interface RetrieveData<
  T extends keyof ForeignTypeMap,
  U extends ForeignTypeMap[T] extends Array<keyof TypeMap>
    ? ForeignTypeMap[T][number]
    : ForeignTypeMap[T],
> {
  request: T;
  foreign: U;
  id: string;
  page?: number;
  perPage?: number;
  paginationOff?: "true" | "false";
  filters?: any;
}

export default async function retrieveByForeignId<
  T extends keyof ForeignTypeMap,
  U extends ForeignTypeMap[T] extends Array<keyof TypeMap>
    ? ForeignTypeMap[T][number]
    : ForeignTypeMap[T],
>({
  request,
  foreign,
  id,
  page,
  perPage,
  paginationOff,
  filters,
}: RetrieveData<T, U>) {
  const option = options[
    `${request}_${foreign}` as keyof MapOptions
  ]

  let path = option.path.replace(/{{id}}/g, id) + `?q=""`

  if (page) {
    path += `&page=${page}`
  }
  if (perPage) {
    path += `&perPage=${perPage}`
  }
  if (paginationOff) {
    path += `&paginationOff=${paginationOff}`
  }
  if (filters) {
    path += `&filters=${filters}`
  }

  const response = await fetchData<TypeMap[T]>({
    path: path,
    method: "GET",
    tag: revalidateTags[option.type],
  });
  return response;
}
