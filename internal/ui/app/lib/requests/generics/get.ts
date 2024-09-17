"use server";

import { Zones, ZonesWithExtra } from "../../types/data/zones";
import { Aisles, AislesWithExtra } from "../../types/data/aisles";
import { Racks, RacksWithExtra } from "../../types/data/racks";
import { Shelfs, ShelfsWithExtra} from "../../types/data/shelfs";
import { RequestOptions } from "../../types/misc";

import fetchData from "../fetch";
import { Response } from "@/app/lib/types/misc";

interface TypeMap {
  Zones: Zones;
  Aisles: Aisles;
  Racks: Racks;
  Shelfs: Shelfs;
}

const tagMap: Record<keyof TypeMap, string> = {
  Zones: "zones",
  Aisles: "aisles",
  Racks: "racks",
  Shelfs: "shelfs",
}

const optionsMap: Record<keyof TypeMap, RequestOptions<TypeMap, T>> = {
  Zones: {
    path: "/zones",
    tag: tagMap["Zones"],
    type: "Zones",
  },
  Aisles: {
    path: "/zones",
    tag: "Zones",
    type: "Zones",
  },
  Racks: {
    path: "/zones",
    tag: "Zones",
    type: "Zones",
  },
  Shelfs: {
    path: "/zones",
    tag: "Zones",
    type: "Zones",
  },
};

console.log(optionsMap)


export async function get<T extends keyof GetTypeMap>(
  typeKey: T,
): Promise<Response<GetTypeMap[T]>>{
  const path = getPathMap[typeKey]
  const tag = tagMap[typeKey]

  const response = await fetchData<T>({
    path: path,
    method: "GET",
    tag: tag,
  })
  return response
}

