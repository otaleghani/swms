import { SupplierCodes, SupplierCode } from "@/app/lib/types/data/supplierCodes";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { SupplierCodeFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

export type SyncPaginatedSupplierCodesBySupplier= {
  supplier: string,
  pagination?: PaginationParams;
  filters?: SupplierCodeFiltersParams;
  streamer: Worker,
  list: SupplierCodes,
  setList: Dispatch<SetStateAction<SupplierCodes>>,
}

export function syncPaginatedSupplierCodesBySupplier({
  supplier,
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedSupplierCodesBySupplier) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "SupplierCodes_Supplier") return;
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
    if (data.type !== "SupplierCode") return;
    streamer.postMessage({
      type: "SupplierCodes_Supplier", 
      foreignId: supplier,
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
