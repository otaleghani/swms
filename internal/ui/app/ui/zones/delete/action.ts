"use server";

import { DeleteZone } from "@/app/lib/requests/zones/delete";
import { revalidateTag } from "next/cache";

export async function HandlerDeleteZone(id: string) {
  const res_body = DeleteZone(id);
  revalidateTag("zone");
}
