import { ShelfsWithExtra } from "../../../types/data/shelfs";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { ShelfFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

export type SyncPaginatedShelfsByZoneWithExtra = {
  rack: string,
  pagination?: PaginationParams;
  filters?: ShelfFiltersParams;
  streamer: Worker,
  list: ShelfsWithExtra,
  setList: Dispatch<SetStateAction<ShelfsWithExtra>>,
}

export function syncPaginatedShelfsByRackWithExtra({
  rack,
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedShelfsByZoneWithExtra) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "ShelfsWithExtra_Rack") return;
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
    if (data.type !== "Shelf") return;
    streamer.postMessage({
      type: "ShelfsWithExtra_Rack", 
      foreignId: rack,
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
