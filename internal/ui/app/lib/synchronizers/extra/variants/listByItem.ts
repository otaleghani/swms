import { VariantFiltersParams } from "../../../types/query/data";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { PaginationParams } from "../../../types/pageParams";
import { Variants } from "@/app/lib/types/data/variants";

export type syncPaginatedVariantsByItem = {
  id: string,
  pagination?: PaginationParams;
  filters?: VariantFiltersParams;
  streamer: Worker,
  list: Variants,
  setList: Dispatch<SetStateAction<Variants>>,
}

export function syncPaginatedVariantsByItem({
  id,
  pagination,
  filters,
  streamer,
  list,
  setList
}: syncPaginatedVariantsByItem) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "Variants_Item") return;
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
    if (data.type !== "Variant") return;

    streamer.postMessage({
      type: "Variants_Item",
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
