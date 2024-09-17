"use server";

import { ZonesWithExtra } from "../../types/data/zones";
import { AislesWithExtra } from "../../types/data/aisles";
import { RacksWithExtra } from "../../types/data/racks";
import { ShelfsWithExtra } from "../../types/data/shelfs";

import fetchData from "../fetch";
import { Response } from "@/app/lib/types/data/misc";

interface TypeMap {
  ZonesWithExtra: ZonesWithExtra;
  AislesWithExtra: AislesWithExtra;
}
type Sandrone = {
  path: string,
  type: keyof TypeMap,
}

const getWithExtraPathMap: Record<keyof GetWithExtraTypeMap, Sandrone> = {
  ZonesWithExtra: {
    path: "/zones/extra",
    type: "Zones",
  },
  AislesWithExtra: {
    path: "/zones/extra",
    type: "Zones",
  }
}
export async function getWithExtra<T extends keyof GetWithExtraTypeMap>(
  typeKey: T,
): Promise<Response<GetWithExtraTypeMap[T]>>{
  const path = getWithExtraPathMap[typeKey].path;
  const tag = tagMap[getWithExtraPathMap[typeKey].type];

  const response = await fetchData<T>({
    path: path,
    method: "GET",
    tag: tag,
  })
  return response
}
