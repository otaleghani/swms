import { SupplierWithExtra } from "@/app/lib/types/data/suppliers";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { SupplierFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

export type SyncPaginatedSuppliersWithExtra = {
  pagination?: PaginationParams;
  filters?: SupplierFiltersParams;
  streamer: Worker,
  list: SupplierWithExtra[],
  setList: Dispatch<SetStateAction<SupplierWithExtra[]>>,
}

export function syncPaginatedSuppliersWithExtra({
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedSuppliersWithExtra) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "SupplierWithExtra") return;
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
    if (!list || data.type !== "Supplier") return;
    if (data.action !== "update") {
      streamer.postMessage({
        type: "SupplierWithExtra", 
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
