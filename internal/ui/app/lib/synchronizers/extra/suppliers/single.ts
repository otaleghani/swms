import { SupplierWithExtra } from "@/app/lib/types/data/suppliers";
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

type SyncSupplierWithExtra = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: SupplierWithExtra;
  setElement: Dispatch<SetStateAction<SupplierWithExtra>>,
}

export function syncSupplierWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncSupplierWithExtra) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "SupplierWithExtra" || data.id !== element.supplier.id) return;
    setSyncState("update");
    element = data.content;
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    handleRelatedSupplierChange(data)
    handleRelevantForeignKeyChange(data)
  }

  const handleRelatedSupplierChange = (data: ServerSentEventData) => {
    if (data.type !== "Supplier" || data.id !== element.supplier.id) return;
    if (data.action === "replace" || data.action === "remove") return;
    streamer.postMessage({type: "SupplierWithExtra", id: element.supplier.id, request: "update"});
  }

  const handleRelevantForeignKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "SupplierCode" && data.type !== "Item") return;
    if (data.after.supplier !== element.supplier.id && data.before.supplier !== element.supplier.id) return;
    if (data.before.supplier === data.after.supplier) return;
    streamer.postMessage({type: "SupplierWithExtra", id: element.supplier.id, request: "update"});
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}
