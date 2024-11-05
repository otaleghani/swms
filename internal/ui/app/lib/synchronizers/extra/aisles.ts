import { AislesWithExtra, AisleWithExtra } from "../../types/data/aisles";
import { Dispatch, SetStateAction } from "react";
import { 
  delaySyncStateToNone, 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  SyncState,
  FetchResultMessage,
} from "../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { AisleFiltersParams } from "../../types/query/data";
import { PaginationParams } from "../../types/pageParams";

export type SyncPaginatedAislesWithExtra = {
  pagination?: PaginationParams;
  filters?: AisleFiltersParams;
  streamer: Worker,
  list: AislesWithExtra,
  setList: Dispatch<SetStateAction<AislesWithExtra>>,
}

export function synchronizePaginatedAislesWithExtra({
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedAislesWithExtra) {
  console.log("list initiated")
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
    console.log("list fired")
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}

type SyncAisleWithExtra = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: AisleWithExtra;
  setElement: Dispatch<SetStateAction<AisleWithExtra>>,
}

export function synchronizeAisleWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncAisleWithExtra) {

  console.log("single initiated")
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "AisleWithExtra" || data.id !== element.aisle.id) return;
    setSyncState("update");
    element = data.content;
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    handleRelatedAisleChange(data)
    handleRelevantForeignKeyChange(data)
  }

  const handleRelatedAisleChange = (data: ServerSentEventData) => {
    // This one change would hopefully call the useEffect in the Card 
    // so that if a zone (foreign key) was changed the data get's updated.
    if (data.type !== "Aisle" || data.id !== element.aisle.id) return;
    setSyncState("update");
    element = {...element, aisle: data.after};
    setElement(element);
    delaySyncStateToNone(setSyncState);
  };

  const handleRelevantForeignKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Rack" && data.type !== "Item") return;
    if (data.after.aisle !== element.aisle.id && data.before.aisle !== element.aisle.id) return;
    if (data.before.aisle === data.after.aisle) return;
    streamer.postMessage({type: "AisleWithExtra", id: element.aisle.id, request: "update"});
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    console.log("single fired")
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}
