import { SubcategoryWithExtra } from "@/app/lib/types/data/subcategories";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { SubcategoryFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

export type SyncPaginatedSubcategorysWithExtra = {
  pagination?: PaginationParams;
  filters?: SubcategoryFiltersParams;
  streamer: Worker,
  list: SubcategoryWithExtra[],
  setList: Dispatch<SetStateAction<SubcategoryWithExtra[]>>,
}

export function syncPaginatedSubcategorysWithExtra({
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedSubcategorysWithExtra) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "SubcategoryWithExtra") return;
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
    if (!list || data.type !== "Subcategory") return;
    if (data.action !== "update") {
      streamer.postMessage({
        type: "SubcategoryWithExtra", 
        page: pagination?.page,
        perPage: pagination?.perPage,
        filters: JSON.stringify(filters),
        request: "refresh",
      });
    };
  };

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}
