"use server";

/** SSE fields */
import stringEmitter from "../../emitters";
import { ServerSentEventData } from "@/app/api/stream/route";

/** Actions */
import fetchData from "../fetch";

/** Consts */
import { revalidateTags } from "../tags";

/** Types and interfaces*/
import { 
  RequestOptions, 
  TypeMap,
  TypeMapFilterSingles
} from "../../types/requests";
import { retrieveById } from "./retrieveById";

type ReplaceMapOptions = {
  [K in Extract<keyof TypeMapFilterSingles,
    "Category" |
    "Subcategory" |
    "Supplier" |
    "Zone" |
    "Aisle" |
    "Rack" |
    "Shelf"
  >]: RequestOptions;
}

const options: ReplaceMapOptions = {
  "Category": { 
    path: "categories/{{replaced}}/replace-with/{{replacer}}", 
    type: "Category" 
  },
  "Subcategory": { 
    path: "subcategories/{{replaced}}/replace-with/{{replacer}}", 
    type: "Subcategories" 
  },
  "Zone": { 
    path: "zones/{{replaced}}/replace-with/{{replacer}}", 
    type: "Zone" 
  },
  "Aisle": { 
    path: "aisles/{{replaced}}/replace-with/{{replacer}}", 
    type: "Aisle" 
  },
  "Rack": { 
    path: "racks/{{replaced}}/replace-with/{{replacer}}", 
    type: "Rack" 
  },
  "Shelf": { 
    path: "shelfs/{{replaced}}/replace-with/{{replacer}}", 
    type: "Shelf" 
  },
  "Supplier": { 
    path: "suppliers/{{replaced}}/replace-with/{{replacer}}", 
    type: "Supplier" 
  },
}

export async function replace<T extends keyof ReplaceMapOptions>(
  request: T,
  itemToDelete: string,
  itemThatReplaces: string,
) {
  const option = options[request];
  const path = option.path.
    replace(/{{replaced}}/g, itemToDelete).
    replace(/{{replacer}}/g, itemThatReplaces);

  // Get first off the data of the item to delete
  const before = await retrieveById(request, itemToDelete)

  const response = await fetchData<undefined>({
    path: path,
    method: "POST",
    tag: revalidateTags[option.type],
  });

  // Second off we want to get the new data of the revalidate
  const after = await retrieveById(request, itemThatReplaces)

  const replaceChange: ServerSentEventData = {
    id: itemToDelete,
    type: request,
    action: "replace",
    before: before.data,
    after: after.data
  };
  stringEmitter.emit("message", replaceChange);

  const updateChange: ServerSentEventData = {
    id: itemThatReplaces,
    type: request,
    action: "update",
    before: after.data,
    after: after.data,
  }
  stringEmitter.emit("message", updateChange);

  return response
}
