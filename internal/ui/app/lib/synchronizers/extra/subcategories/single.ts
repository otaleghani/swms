import { SubcategoryWithExtra } from "@/app/lib/types/data/subcategories";
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

type SyncSubcategoryWithExtra = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: SubcategoryWithExtra;
  setElement: Dispatch<SetStateAction<SubcategoryWithExtra>>,
}

export function syncSubcategoryWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncSubcategoryWithExtra) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "SubcategoryWithExtra" || data.id !== element.subcategory.id) return;
    setSyncState("update");
    element = data.content;
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    handleRelatedSubcategoryChange(data)
    handleRelevantForeignKeyChange(data)
  }

  const handleRelatedSubcategoryChange = (data: ServerSentEventData) => {
    if (data.type !== "Subcategory" || data.id !== element.subcategory.id) return;
    streamer.postMessage({type: "SubcategoryWithExtra", id: element.subcategory.id, request: "update"});
  }

  const handleRelevantForeignKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Item") return;
    if (data.after.subcategory !== element.subcategory.id && data.before.subcategory !== element.subcategory.id) return;
    if (data.before.subcategory === data.after.subcategory) return;
    streamer.postMessage({type: "SubcategoryWithExtra", id: element.subcategory.id, request: "update"});
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}
