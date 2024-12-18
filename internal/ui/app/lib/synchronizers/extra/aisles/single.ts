import { AislesWithExtra, AisleWithExtra } from "../../../types/data/aisles";
import { Dispatch, SetStateAction } from "react";
import { 
  delaySyncStateToNone, 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  SyncState,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { AisleFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

type SyncAisleWithExtra = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: AisleWithExtra;
  setElement: Dispatch<SetStateAction<AisleWithExtra>>,
}

export function syncAisleWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncAisleWithExtra) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "AisleWithExtra" || data.id !== element.aisle.id) return;
    setSyncState("update");
    element = data.content;
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    handleRelatedAisleChange(data);
    handleRelevantForeignKeyChange(data);
    handleForeignKeyChange(data);
  };

  const handleRelatedAisleChange = (data: ServerSentEventData) => {
    if (data.type !== "Aisle" || data.id !== element.aisle.id) return;
    if (data.action === "replace" || data.action === "remove") return;
    setSyncState("update");
    element = {...element, aisle: data.after};
    setElement(element);
    delaySyncStateToNone(setSyncState);
  };

  const handleRelevantForeignKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Rack" && data.type !== "Item") return;
    if (data.after.aisle !== element.aisle.id && data.before.aisle !== element.aisle.id) return;
    streamer.postMessage({type: "AisleWithExtra", id: element.aisle.id, request: "update"});
  }

  const handleForeignKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Zone") return;
    if (data.before.id === data.after.id) return;
    if (data.before.id !== element.aisle.id) return;
    setSyncState("update");
    element = {...element, aisle: {
      ...element.aisle, zone: data.after.id
    }}
    delaySyncStateToNone(setSyncState);
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}

export type SyncPaginatedAislesByZoneWithExtra = {
  zone: string;
  pagination?: PaginationParams;
  filters?: AisleFiltersParams;
  streamer: Worker,
  list: AislesWithExtra,
  setList: Dispatch<SetStateAction<AislesWithExtra>>,
}
