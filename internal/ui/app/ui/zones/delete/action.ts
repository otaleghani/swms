"use server";

import { DeleteZone } from "@/app/lib/requests/zones/delete";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function HandlerDeleteZone(id: string) {
  const res_body = DeleteZone(id);
  revalidateTag("zones");
  redirect("/zones");
}


