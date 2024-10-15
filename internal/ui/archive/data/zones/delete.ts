"use server";

import fetchData from "../../fetch";
import { EmptyRP } from "@/app/lib/types/data/misc";
import { zonesTag as tag } from "../../tags";

export async function deleteZone(id: string): EmptyRP {
  const response = await fetchData<undefined>({
    path: `zones/${id}`,
    method: "DELETE",
    tag: tag,
  });
  return response;
}

export async function deleteAndReplaceZone(
  oldItemId: string,
  newItemId: string,
): EmptyRP {
  const response = await fetchData<undefined>({
    path: `zones/${oldItemId}/replace-with/${newItemId}`,
    method: "POST",
    tag: tag,
  });

  return response;
}
