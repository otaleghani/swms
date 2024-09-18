"use server";

/** Actions */
import fetchData from "../fetch";

/** Consts */
import { revalidateTags } from "../tags";

/** Types and interfaces*/
import { RequestOptions, TypeMap } from "../../types/requests";


const getOptionsMap: Record<keyof TypeMap, RequestOptions<TypeMap>> = {
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

