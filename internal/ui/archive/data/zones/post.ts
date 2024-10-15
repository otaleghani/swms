"use server";

/** Actions */
import fetchData from "../../fetch";
import { revalidateTag } from "next/cache";

/** Consts */
// import { zonesTag as tag } from "../../tags";

/** Types and iterfaces */
import { 
  ResponseDataPost,
  PostRP,
  EmptyRP,
} from "@/app/lib/types/misc";
import { 
  Zone,
  BulkZonesRequest
} from "@/app/lib/types/data/zones";

// export async function postZone(body: Zone): PostRP {
//   const response = await fetchData<ResponseDataPost>({
//     path: "zones/",
//     method: "POST",
//     tag: tag,
//     payload: body,
//   });
// 
//   if (response.code === 201) {
//     revalidateTag(tag);
//   }
// 
//   return response;
// }
// 
// export async function postZonesBulk(body: BulkZonesRequest): EmptyRP {
//   const response = await fetchData<undefined>({
//     path: "zones/bulk/",
//     method: "POST",
//     tag: tag,
//     payload: body,
//   });
// 
//   if (response.code === 201) {
//     revalidateTag(tag);
//   }
// 
//   return response;
// }
