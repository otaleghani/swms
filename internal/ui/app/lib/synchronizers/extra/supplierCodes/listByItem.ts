import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "../../utils";
import { ServerSentEventData } from "@/app/api/stream/route";
import { SupplierCodes } from "@/app/lib/types/data/supplierCodes";

export type syncSupplierCodesByItem = {
  id: string,
  streamer: Worker,
  list: SupplierCodes,
  setList: Dispatch<SetStateAction<SupplierCodes>>,
}

export function syncSupplierCodesByItem({
  id,
  streamer,
  list,
  setList
}: syncSupplierCodesByItem) {

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== "SupplierCodes_Item") return;
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
    if (data.type !== "SupplierCode") return;

    streamer.postMessage({
      type: "SupplierCodes_Item",
      foreignId: id,
      filters: JSON.stringify({}),
      request: "refresh",
    });
  };

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  };
  streamer.addEventListener("message", handler);
}
