"use server";

import { deleteZone } from "@/app/lib/requests/zones/delete";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function HandlerDeleteZone(id: string) {
  const res_body = deleteZone(id);
  revalidateTag("zones");
  redirect("/zones");
}
