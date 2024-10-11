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
    type: "Subcategory" 
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
    path: "shelfs/{{replaced}}/replace-with/{{replacer}}", 
    type: "Supplier" 
  },
}

export async function replace<T extends keyof ReplaceMapOptions>(
  request: T,
  replaced: string,
  replacer: string,
) {
  const option = options[request];
  const path = option.path.
    replace(/{{replaced}}/g, replaced).
    replace(/{{replacer}}/g, replacer);

  const response = await fetchData<undefined>({
    path: path,
    method: "POST",
    tag: revalidateTags[option.type],
  });

  const streamedChange: ServerSentEventData = {
    id: replaced,
    type: request,
    action: "replace",
  };
  stringEmitter.emit('message', streamedChange);

  return response
}
