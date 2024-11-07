import { ShelfsWithExtra, ShelfWithExtra } from "@/app/lib/types/data/shelfs";
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
import { ShelfFiltersParams } from "../../../types/query/data";
import { PaginationParams } from "../../../types/pageParams";

type SyncShelfWithExtra = {
  streamer: Worker;
  setSyncState: Dispatch<SetStateAction<SyncState>>;
  element: ShelfWithExtra;
  setElement: Dispatch<SetStateAction<ShelfWithExtra>>,
}

export function syncShelfWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncShelfWithExtra) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "ShelfWithExtra" || data.id !== element.shelf.id) return;
    setSyncState("update");
    element = data.content;
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    handleRelatedShelfChange(data)
    handleRelevantForeignKeyChange(data)
  }

  const handleRelatedShelfChange = (data: ServerSentEventData) => {
    if (data.type !== "Shelf" || data.id !== element.shelf.id) return;
    setSyncState("update");
    element = {...element, shelf: data.after};
    setElement(element);
    delaySyncStateToNone(setSyncState);
  };

  const handleRelevantForeignKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Item") return;
    if (data.after.shelf !== element.shelf.id && data.before.shelf !== element.shelf.id) return;
    if (data.before.shelf === data.after.shelf) return;
    streamer.postMessage({type: "ShelfWithExtra", id: element.shelf.id, request: "update"});
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}

export type SyncPaginatedShelfsByZoneWithExtra = {
  zone: string;
  pagination?: PaginationParams;
  filters?: ShelfFiltersParams;
  streamer: Worker,
  list: ShelfsWithExtra,
  setList: Dispatch<SetStateAction<ShelfsWithExtra>>,
}
