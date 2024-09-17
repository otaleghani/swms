"use server";

import fetchData from "../../fetch";
import { EmptyRP } from "@/app/lib/types/data/misc";
import { aislesTag as tag } from "../../tags";

export async function deleteAisle(id: string): EmptyRP {
  const response = await fetchData<undefined>({
    path: `aisles/${id}`,
    method: "DELETE",
    tag: tag,
  });
  return response;
}

export async function deleteAndReplaceAisle(
  oldItemId: string,
  newItemId: string,
): EmptyRP {
  const response = await fetchData<undefined>({
    path: `aisles/${oldItemId}/replace-with/${newItemId}`,
    method: "POST",
    tag: tag,
  });

  return response;
}
