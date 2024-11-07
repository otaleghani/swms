import { AislesWithExtra } from "../../../types/data/aisles";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { AisleFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

export type SyncPaginatedAislesWithExtra = {
  pagination?: PaginationParams;
  filters?: AisleFiltersParams;
  streamer: Worker,
  list: AislesWithExtra,
  setList: Dispatch<SetStateAction<AislesWithExtra>>,
}

export function syncPaginatedAislesWithExtra({
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedAislesWithExtra) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "AisleWithExtra") return;
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
    if (!list || data.type !== "Aisle") return;
    if (data.action !== "update") {
      streamer.postMessage({
        type: "AisleWithExtra", 
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
