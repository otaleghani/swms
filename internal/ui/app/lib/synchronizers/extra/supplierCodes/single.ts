import { ItemWithSupplierCodes } from "@/app/lib/types/data/supplierCodes";
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

type SyncSupplierCodesWithExtra = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: ItemWithSupplierCodes;
  setElement: Dispatch<SetStateAction<ItemWithSupplierCodes>>,
}

export function syncSupplierCodesWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncSupplierCodesWithExtra) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "ItemWithSupplierCodes") return;
    if (data.id !== element.id) return;
    setSyncState("update");
    element = data.content;
    setElement(element);
    delaySyncStateToNone(setSyncState);
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    handleRelatedItemChange(data);
    handleRelevantItemKeyChange(data);
    handleRelevantVariantKeyChange(data);
    handleRelevantSupplierCodeKeyChange(data);
  }

  const handleRelatedItemChange = (data: ServerSentEventData) => {
    if (data.type !== "Item" || data.id !== element.id) return;
    if (data.action === "replace" || data.action === "remove") return;
    streamer.postMessage({
      type: "ItemWithSupplierCodes",
      id: element.id,
      request: "update"
    });
  }

  const handleRelevantItemKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Item") return;
    if (data.after.id !== element.id) return;
    if (data.before.id !== element.id) return;

    streamer.postMessage({
      type: "ItemWithSupplierCodes",
      id: element.id,
      request: "update"
    });
  }

  const handleRelevantVariantKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "Variant") return;
    if (!element.variants.find((item) => (
      item.id == data.after.id || item.id == data.before.id
    ))) return;

    streamer.postMessage({
      type: "ItemWithSupplierCodes",
      id: element.id,
      request: "update"
    });
  }

  const handleRelevantSupplierCodeKeyChange = (data: ServerSentEventData) => {
    if (data.type !== "SupplierCode") return;
    for (let i = 0; i < element.variants.length; i++) {
      if (!element.variants[i].supplierCodes.find((item) => (
        item.id == data.after.id || item.id == data.before.id
      ))) return;
    }

    streamer.postMessage({
      type: "ItemWithSupplierCodes",
      id: element.id,
      request: "update"
    });
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}
