"use server";

/** SSE fields */
import stringEmitter from "../../emitters";
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

  const streamedChange: ServerSentEventData = {
    id: "",
    type: request,
    action: "createInBulk",
    before: payload,
    after: null,
  };
  stringEmitter.emit('message', streamedChange);

  return response
}
