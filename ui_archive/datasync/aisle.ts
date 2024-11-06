import { Aisle } from "@/app/lib/types/data/aisles";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  WorkerMessage,
  SyncState,
} from "../utils";

export type SyncAisle = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  aisle: Aisle,
  setAisle: Dispatch<SetStateAction<Aisle>>,
}

export function syncronzeAisleSingle({
  streamer,
  aisle,
}: SyncAisle) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    // If one of the foreign keys gets either replaced or deleted
    // we want to update this element
    if (isServerSentMessage(message.data)) {

      // zone
      if (message.data.type == "Zone" && (
      message.data.action == "replace" ||
      message.data.action == "remove"
      ) && message.data.id == aisle.zone) {
        streamer.postMessage({
          type: "Aisle",
          id: aisle.id
        });
      };
    };
  };

  streamer.addEventListener("message", handler);
}
