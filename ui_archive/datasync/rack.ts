import { Rack } from "@/app/lib/types/data/racks";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  WorkerMessage,
  SyncState,
} from "../utils";

export type SyncRack = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  rack: Rack,
  setRack: Dispatch<SetStateAction<Rack>>,
}

export function syncronzeRackSingle({
  streamer,
  rack,
}: SyncRack) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    // If one of the foreign keys gets either replaced or deleted
    // we want to update this element
    if (isServerSentMessage(message.data)) {

      // zone
      if (message.data.type == "Zone" && (
      message.data.action == "replace" ||
      message.data.action == "remove"
      ) && message.data.id == rack.zone) {
        streamer.postMessage({
          type: "Rack",
          id: rack.id
        });
      };
      
      // aisle
      if (message.data.type == "Aisle" && (
      message.data.action == "replace" ||
      message.data.action == "remove"
      ) && message.data.id == rack.aisle) {
        streamer.postMessage({
          type: "Rack",
          id: rack.id
        });
      };

    };
  };

  streamer.addEventListener("message", handler);
}
