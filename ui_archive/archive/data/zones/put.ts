"use server";

import fetchData from "../../fetch";
import { zonesTag as tag } from "../../tags";
import { EmptyRP } from "@/app/lib/types/data/misc";
import { Zone } from "@/app/lib/types/data/zones";

export async function putZone(data: Zone, id: string): EmptyRP {
  const response = await fetchData<undefined>({
    path: `zones/${id}`,
    method: "PUT",
    tag: tag,
    payload: data,
  });

  return response;
}
