import { TypeMap } from "../types/requests"

/** Maps keyof TypeMap to the string used to tag every request,
  * so that it can be used to revalidate if needed after a request.
  */
export const revalidateTags: Record<keyof TypeMap, string> = {
  "Zone":             "zones",
  "Zones":            "zones",
  "ZoneWithExtra":    "zones",
  "ZonesWithExtra":   "zones",

  "Aisle":            "aisles",
  "Aisles":           "aisles",
  "AisleWithExtra":   "aisles",
  "AislesWithExtra":  "aisles",

  "Racks":            "racks",
}

//export const asdf: Record<keyof TypeMap, >
