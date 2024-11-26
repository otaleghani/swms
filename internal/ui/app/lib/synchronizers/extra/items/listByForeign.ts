import { Items } from "../../../types/data/items";
import { ItemFiltersParams } from "../../../types/query/data";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { PaginationParams } from "../../../types/pageParams";

export type SyncPaginatedItemByForeign = {
  id: string,
  type: "Zone" | "Aisle" | "Rack" | "Shelf" | "Category" | "Subcategory";
  pagination?: PaginationParams;
  filters?: ItemFiltersParams;
  streamer: Worker,
  list: Items,
  setList: Dispatch<SetStateAction<Items>>,
}

export function syncPaginatedItemByForeign({
  id,
  type,
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedItemByForeign) {

  let typeForeign: any;
  if (type == "Zone") { typeForeign = "Items_Zone" }
  if (type == "Aisle") { typeForeign = "Items_Aisle" }
  if (type == "Rack") { typeForeign = "Items_Rack" }
  if (type == "Shelf") { typeForeign = "Items_Shelf" }
  if (type == "Category") { typeForeign = "Items_Category" }
  if (type == "Subcategory") { typeForeign = "Items_Subcategory" }

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== typeForeign) return;
    switch (data.request) {
      case "error":
        console.error("Something went wrong with client-side fetching");
        break;
      case "refresh": 
        list = data.content;
        setList(list);
        break;
    };
  };

  const handleServerSentMessage = (data: ServerSentEventData) => {
    if (data.type !== "Item") return;

    streamer.postMessage({
      type: typeForeign,
      foreignId: id,
      page: pagination?.page,
      perPage: pagination?.perPage,
      filters: JSON.stringify(filters),
      request: "refresh",
    });
  };

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}
