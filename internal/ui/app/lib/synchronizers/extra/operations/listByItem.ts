import { OperationsFiltersParams } from "../../../types/query/data";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { PaginationParams } from "../../../types/pageParams";
import { Operations } from "@/app/lib/types/data/operations";

export type syncPaginatedOperationsByItem = {
  id: string,
  pagination?: PaginationParams;
  filters?: OperationsFiltersParams;
  streamer: Worker,
  list: Operations,
  setList: Dispatch<SetStateAction<Operations>>,
}

export function syncPaginatedOperationsByItem({
  id,
  pagination,
  filters,
  streamer,
  list,
  setList
}: syncPaginatedOperationsByItem) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "Operations_Item") return;
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
    if (data.type !== "Operation") return;

    streamer.postMessage({
      type: "Operations_Item",
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
