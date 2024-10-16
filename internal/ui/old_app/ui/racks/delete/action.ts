"use server";

import { deleteRack } from "@/app/lib/requests/racks/delete";
import { revalidateTag } from "next/cache";

export async function handlerDeleteRack(id: string) {
  const res_body = deleteRack(id);
  revalidateTag("racks");
    revalidateTag("aisles");
}
