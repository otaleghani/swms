"use server";

import { DeleteZone } from "@/app/lib/requests/zones/delete";
import { DeleteZoneDialog } from "./dialog";
import { revalidateTag } from "next/cache";

export async function HandlerDeleteZone(id: string) {
  const res_body = DeleteZone(id);
  console.log(res_body);

  revalidateTag("zone");
}
