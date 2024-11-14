import { CategoryWithExtra } from "@/app/lib/types/data/categories";
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

type SyncCategoryWithExtra = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: CategoryWithExtra;
  setElement: Dispatch<SetStateAction<CategoryWithExtra>>,
}

export function syncCategoryWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncCategoryWithExtra) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "CategoryWithExtra" || data.id !== element.category.id) return;
    setSyncState("update");
    element = data.content;
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    handleRelatedCategoryChange(data)
    handleRelevantForeignKeyChange(data)
  }

  const handleRelatedCategoryChange = (data: ServerSentEventData) => {
    if (data.type !== "Category" || data.id !== element.category.id) return;
    if (data.action === "replace" || data.action === "remove") return;
    streamer.postMessage({type: "CategoryWithExtra", id: element.category.id, request: "update"});
  }

  const handleRelevantForeignKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Subcategory" && data.type !== "Item") return;
    if (data.after.category !== element.category.id && data.before.category !== element.category.id) return;
    //if (data.before.category === data.after.category) return;
    streamer.postMessage({type: "CategoryWithExtra", id: element.category.id, request: "update"});
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}
