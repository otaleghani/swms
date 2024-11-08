import { RacksWithExtra, RackWithExtra } from "@/app/lib/types/data/racks";
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
import { RackFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

type SyncRackWithExtra = {
  streamer: Worker;
  setSyncState: Dispatch<SetStateAction<SyncState>>;
  element: RackWithExtra;
  setElement: Dispatch<SetStateAction<RackWithExtra>>,
}

export function syncRackWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncRackWithExtra) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "RackWithExtra" || data.id !== element.rack.id) return;
    setSyncState("update");
    element = data.content;
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    handleRelatedRackChange(data)
    handleRelevantForeignKeyChange(data)
  }

  const handleRelatedRackChange = (data: ServerSentEventData) => {
    if (data.type !== "Rack" || data.id !== element.rack.id) return;
    if (data.action === "replace" || data.action === "remove") return;
    setSyncState("update");
    element = {...element, rack: data.after};
    setElement(element);
    delaySyncStateToNone(setSyncState);
  };

  const handleRelevantForeignKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Shelf" && data.type !== "Item") return;
    if (data.after.rack !== element.rack.id && data.before.rack !== element.rack.id) return;
    if (data.before.rack === data.after.rack) return;
    streamer.postMessage({type: "RackWithExtra", id: element.rack.id, request: "update"});
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}

export type SyncPaginatedRacksByZoneWithExtra = {
  zone: string;
  pagination?: PaginationParams;
  filters?: RackFiltersParams;
  streamer: Worker,
  list: RacksWithExtra,
  setList: Dispatch<SetStateAction<RacksWithExtra>>,
}
