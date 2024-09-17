"use server";

/** Actions */
import fetchData from "../../fetch";
import { revalidateTag } from "next/cache";

/** Consts */
import { aislesTag as tag } from "../../tags";

import { 
  ResponseDataPost,
  PostRP,
  EmptyRP,
} from "@/app/lib/types/data/misc";
import { Aisle, BulkAislesRequest } from "@/app/lib/types/data/aisles";

export async function postAisle(body: Aisle): PostRP {
  const response = await fetchData<ResponseDataPost>({
    path: "aisles/",
    method: "POST",
    tag: tag,
    payload: body,
  });

  if (response.code === 201) {
    revalidateTag(tag);
  }

  return response;
}

export async function postAislesBulk(body: BulkAislesRequest): EmptyRP {
  const response = await fetchData<undefined>({
    path: "aisles/bulk/",
    method: "POST",
    tag: tag,
    payload: body,
  });

  if (response.code === 201) {
    revalidateTag(tag);
  }

  return response;
}
