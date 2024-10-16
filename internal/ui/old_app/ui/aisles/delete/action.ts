"use server";

import { DeleteAisle } from "@/app/lib/requests/aisles/delete";
import { revalidateTag } from "next/cache";

export async function HandlerDeleteAisle(id: string) {
  const res_body = DeleteAisle(id);
  revalidateTag("aisles");
  revalidateTag("zones");
  //redirect("/zones");
}
