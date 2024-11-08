import { CategoryWithExtra } from "@/app/lib/types/data/categories";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { CategoryFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

export type SyncPaginatedCategoriesWithExtra = {
  pagination?: PaginationParams;
  filters?: CategoryFiltersParams;
  streamer: Worker,
  list: CategoryWithExtra[],
  setList: Dispatch<SetStateAction<CategoryWithExtra[]>>,
}

export function syncPaginatedCategoriesWithExtra({
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedCategoriesWithExtra) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "CategoryWithExtra") return;
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
    if (!list || data.type !== "Category") return;
    if (data.action !== "update") {
      streamer.postMessage({
        type: "CategoryWithExtra", 
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
