"use server";

/** Actions */
import fetchData from "../fetch";

/** Consts */
import { zonesTag as tag } from "../tags";

/** Types and iterfaces */
import { Response, ResponseDataPost } from "@/app/lib/types/data/misc";
import { Zone } from "@/app/lib/types/data/zones";

export async function postZone(body: Zone): Promise<Response<ResponseDataPost>> {
  const response = await fetchData<ResponseDataPost>({
    path: "zones/",
    method: "POST",
    tag: tag,
    payload: body,
  });

  return response;
}

export async function postZonesBulk(body: number): Promise<Response<undefined>> {
  const response = await fetchData<undefined>({
    path: "zones/bulk/",
    method: "POST",
    tag: tag,
    payload: body,
  });

  return response;
}
