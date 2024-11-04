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

  if (request == "Zones") {
    const streamedChange: ServerSentEventData = {
      id: "",
      type: "Zone",
      action: "createInBulk",
      before: "",
      after: "",
    };
    stringEmitter.emit("message", streamedChange);
  }
  if (request == "Aisles") {
    const streamedChange: ServerSentEventData = {
      id: "",
      type: "Aisle",
      action: "createInBulk",
      before: "",
      after: "",
    };
    stringEmitter.emit("message", streamedChange);
  }
  if (request == "Racks") {
    const streamedChange: ServerSentEventData = {
      id: "",
      type: "Rack",
      action: "createInBulk",
      before: "",
      after: "",
    };
    stringEmitter.emit("message", streamedChange);
  }
  if (request == "Shelfs") {
    const streamedChange: ServerSentEventData = {
      id: "",
      type: "Shelfs",
      action: "createInBulk",
      before: "",
      after: "",
    };
    stringEmitter.emit("message", streamedChange);
  }

  return response
}
