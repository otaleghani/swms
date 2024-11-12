import { RacksWithExtra } from "../../../types/data/racks";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { RackFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

export type SyncPaginatedRacksWithExtra = {
  pagination?: PaginationParams;
  filters?: RackFiltersParams;
  streamer: Worker,
  list: RacksWithExtra,
  setList: Dispatch<SetStateAction<RacksWithExtra>>,
}

export function syncPaginatedRacksWithExtra({
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedRacksWithExtra) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "RackWithExtra") return;
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
    if (!list || data.type !== "Rack") return;
    if (data.action !== "update") {
      streamer.postMessage({
        type: "RackWithExtra", 
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
