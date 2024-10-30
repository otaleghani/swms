"use server";

/** SSE fields */
import stringEmitter from "@/app/lib/emitters";
import { ServerSentEventData } from "@/app/api/stream/route";

/** Actions */
import fetchData from "../fetch";

/** Consts */
import { revalidateTags } from "../tags";

/** Types and interfaces*/
import { RequestOptions, TypeMapFilterLists } from "../../types/requests";
import { ZonesBulkPostRequestBody } from "../../types/data/zones";
import { AislesBulkPostRequestBody } from "../../types/data/aisles";
import { RacksBulkPostRequestBody } from "../../types/data/racks";
import { ShelfsBulkPostRequestBody } from "../../types/data/shelfs";
import { retrieveById } from "./retrieveById";
import { retrieve } from "./retrieve";

type CreateInBulkMapOptions = {
  [K in Extract<keyof TypeMapFilterLists, 
    "Zones" |
    "Aisles" |
    "Racks" |
    "Shelfs"
  >]: RequestOptions;
}

const options: CreateInBulkMapOptions = {
  "Zones":  { path: "zones/bulk/",   type: "Zones" },
  "Aisles": { path: "aisles/bulk/",  type: "Aisles" },
  "Racks":  { path: "racks/bulk/",   type: "Racks" },
  "Shelfs": { path: "shelfs/bulk/",  type: "Shelfs" },
}

type BulkPostRequestBody = {
  Zones:  ZonesBulkPostRequestBody;
  Aisles: AislesBulkPostRequestBody;
  Racks:  RacksBulkPostRequestBody;
  Shelfs: ShelfsBulkPostRequestBody;
}

export async function createInBulk<T extends keyof CreateInBulkMapOptions>(
  request: T,
  payload: BulkPostRequestBody[T],
) {
  const option = options[request];

  const response = await fetchData<undefined>({
    path: option.path,
    method: "POST",
    tag: revalidateTags[option.type],
    payload: payload,
  });

  const data: any = response.data;

  for (let i = 0; i < data.length; i++) {
    let item;
    if (request == "Zones") {
      item = await retrieveById("Zone", data[i]);
      const streamedChange: ServerSentEventData = {
        id: item.data?.id as string,
        type: "Zone",
        action: "create",
        before: payload,
        after: item.data,
      };
      stringEmitter.emit("message", streamedChange);
    }
    if (request == "Aisles") {
      item = await retrieveById("Aisle", data[i]);
      const streamedChange: ServerSentEventData = {
        id: item.data?.id as string,
        type: "Aisle",
        action: "create",
        before: payload,
        after: item.data,
      };
      stringEmitter.emit("message", streamedChange);
    }
    if (request == "Racks") {
      item = await retrieveById("Rack", data[i]);
      const streamedChange: ServerSentEventData = {
        id: item.data?.id as string,
        type: "Rack",
        action: "create",
        before: payload,
        after: item.data,
      };
      stringEmitter.emit("message", streamedChange);
    }
    if (request == "Shelfs") {
      item = await retrieveById("Shelf", data[i]);
      const streamedChange: ServerSentEventData = {
        id: item.data?.id as string,
        type: "Shelf",
        action: "create",
        before: payload,
        after: item.data,
      };
      stringEmitter.emit("message", streamedChange);
    }
  }

  return response
}
