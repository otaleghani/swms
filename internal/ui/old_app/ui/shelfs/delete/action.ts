"use server";

import { deleteShelf } from "@/app/lib/requests/shelfs/delete";
import { revalidateTag } from "next/cache";

export async function handlerDeleteShelf(id: string) {
  const res_body = deleteShelf(id);
  revalidateTag("shelfs");
  revalidateTag("aisles");
  revalidateTag("racks");
  revalidateTag("zones");
}
