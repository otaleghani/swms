import { ZoneWithExtra } from "@/app/lib/types/data/zones";
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

type SyncZoneWithExtra = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: ZoneWithExtra;
  setElement: Dispatch<SetStateAction<ZoneWithExtra>>,
}

export function syncZoneWithExtra({
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
    streamer.postMessage({type: "ZoneWithExtra", id: element.zone.id, request: "update"});
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
