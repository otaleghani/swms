"use server";

import { Zone, Zones, ZonesWithExtra } from "../../types/data/zones";
import { Aisles, AislesWithExtra } from "../../types/data/aisles";
import { Racks, RacksWithExtra } from "../../types/data/racks";
import { Shelfs, ShelfsWithExtra} from "../../types/data/shelfs";
import { RequestOptions } from "../../types/misc";

import fetchData from "../fetch";
import { Response } from "@/app/lib/types/misc";
import { tags } from "../tags";

interface TypeMap2 {

}

// This are the types that you can use with ths 
interface TypeMap {
  Zone: Zone;
  Zones: Zones;
  ZonesWithExtra: ZonesWithExtra;
  Aisles: Aisles;
  Racks: Racks;
  Shelfs: Shelfs;

}


interface GetTypeMap {
  Zones: Zones,
  Aisles: Aisles,
}

interface GetRequest = Record<keyof , RequestOptions<TypeMap>>


const tagMap: Record<keyof TypeMap, string> = {
  Zone: tags.zones,
  Zones: tags.zones,
  ZonesWithExtra: tags.zones,
  Aisles: tags.aisles,
  Racks: tags.racks,
  Shelfs: tags.shelfs,
}


const getOptionsMap: Record<keyof TypeMap, RequestOptions<TypeMap>> = {
  Zones: {
    path: "/zones",
    tag: tagMap["Zones"],
    type: "ones",
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


export async function getList<T extends keyof TypeMap>(
  typeKey: T,
): Promise<Response<TypeMap[T]>>{
  //const path = getPathMap[typeKey]
  //const tag = tagMap[typeKey]

  const path = getOptionsMap[typeKey].tag

  const response = await fetchData<TypeMap[T]>({
    path: path,
    method: "GET",
    tag: tags.aisles,
  })
  return response
}

export async function getRecord(id: string) {}

export async function putRecord(id: string) {}
export async function deleteRecord(id: string) {}
export async function postRecord<T>(typeToPost: T) {}
export async function postBulkRecord() {}

export async function getListByForeignKey() {}
// const response = getListByForeignKey("Aisles", "Zone", "89a3191f-9a98-43b4-b233-221ca50d3e13")

