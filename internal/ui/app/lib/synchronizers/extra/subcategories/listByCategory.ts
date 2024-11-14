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

export type SyncPaginatedSubcategorysByCategoryWithExtra = {
  category: string,
  pagination?: PaginationParams;
  filters?: SubcategoryFiltersParams;
  streamer: Worker,
  list: SubcategoryWithExtra[],
  setList: Dispatch<SetStateAction<SubcategoryWithExtra[]>>,
}

export function syncPaginatedSubcategoriesByCategoryWithExtra({
  category,
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedSubcategorysByCategoryWithExtra) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "SubcategoriesWithExtra_Category") return;
    console.log("THERE THERE")
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
    if (data.type !== "Subcategory") return;
    streamer.postMessage({
      type: "SubcategoriesWithExtra_Category", 
      foreignId: category,
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
