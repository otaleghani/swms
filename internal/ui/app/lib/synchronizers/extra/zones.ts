import { ZoneWithExtra } from "@/app/lib/types/data/zones";
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
import { ZoneFiltersParams } from "../../types/query/data";
import { PaginationParams } from "../../types/pageParams";

export type SyncZonesWithExtra = {
  streamer: Worker,
  list: ZoneWithExtra[],
  setList: Dispatch<SetStateAction<ZoneWithExtra[]>>,
}

export type SyncPaginatedZonesWithExtra = {
  pagination?: PaginationParams;
  filters?: ZoneFiltersParams;
  streamer: Worker,
  list: ZoneWithExtra[],
  setList: Dispatch<SetStateAction<ZoneWithExtra[]>>,
}

export function synchronizeZonesWithExtraList({
  streamer,
  list,
  setList
}: SyncZonesWithExtra) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "ZoneWithExtra") return;
    switch (data.request) {
      case "error":
        console.error("Something went wrong with client-side fetching");
        break;
      case "create":
        list = [...list, data.content];
        setList(list)
        break;
      case "delete":
        list = list.filter((item) => item !== data.content.zone.id);
        setList(list)
        break;
      default:
        console.warn(`Unhandled action type: ${data.request}`);
    };
  };

  const handleServerSentMessage = (data: ServerSentEventData) => {
    if (!list || data.type !== "Zone") return;

    switch (data.action) {
      case "replace":
        list = list.filter((item) => item.zone.id !== data.before.id);
        setList(list);
        streamer.postMessage({type: "ZoneWithExtra", id: data.after.id, request: "replace"});
        break;

      case "create":
        streamer.postMessage({type: "ZoneWithExtra", id: data.after.id, request: "create"});
        break;
        
      default:
        console.warn(`Unhandled action type: ${data.action}`);
    };
  };

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}

export function synchronizePaginatedZonesWithExtra({
  pagination,
  filters,
  streamer,
  list,
  setList
}: SyncPaginatedZonesWithExtra) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "ZoneWithExtra") return;
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
    if (!list || data.type !== "Zone") return;
    if (data.action !== "update") {
      streamer.postMessage({
        type: "ZoneWithExtra", 
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

type SyncZoneWithExtra = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: ZoneWithExtra;
  setElement: Dispatch<SetStateAction<ZoneWithExtra>>,
}

export function synchronizeZoneWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncZoneWithExtra) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "ZoneWithExtra" || data.id !== element.zone.id) return;
    setSyncState("update");
    element = data.content;
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    handleRelatedZoneChange(data)
    handleRelevantForeignKeyChange(data)
  }

  const handleRelatedZoneChange = (data: ServerSentEventData) => {
    if (data.type !== "Zone" || data.id !== element.zone.id) return;
    setSyncState("update");
    element = {...element, zone: data.after};
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleRelevantForeignKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Aisle" && data.type !== "Item") return;
    if (data.after.zone !== element.zone.id && data.before.zone !== element.zone.id) return;
    if (data.before.zone === data.after.zone) return;
    streamer.postMessage({type: "ZoneWithExtra", id: element.zone.id, request: "update"});
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}
