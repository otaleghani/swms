"use server";

import fetchData from "../../fetch";
import { aislesTag as tag } from "../../tags";
import { EmptyRP } from "@/app/lib/types/data/misc";
import { Aisles } from "@/app/lib/types/data/aisles";

export async function putAisle(data: Aisles, id: string): EmptyRP {
  const response = await fetchData<undefined>({
    path: `aisles/${id}`,
    method: "PUT",
    tag: tag,
    payload: data,
  });

  return response;
}
