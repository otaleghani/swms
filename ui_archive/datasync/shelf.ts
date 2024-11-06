import { Shelf } from "@/app/lib/types/data/shelfs";
import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  WorkerMessage,
  SyncState,
} from "../utils";

export type SyncShelf = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  shelf: Shelf,
  setShelf: Dispatch<SetStateAction<Shelf>>,
}

export function syncronzeShelfSingle({
  streamer,
  shelf,
}: SyncShelf) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    // If one of the foreign keys gets either replaced or deleted
    // we want to update this element
    if (isServerSentMessage(message.data)) {

      // zone
      if (message.data.type == "Zone" && (
      message.data.action == "replace" ||
      message.data.action == "remove"
      ) && message.data.id == shelf.zone) {
        streamer.postMessage({
          type: "Shelf",
          id: shelf.id
        });
      };
      
      // aisle
      if (message.data.type == "Aisle" && (
      message.data.action == "replace" ||
      message.data.action == "remove"
      ) && message.data.id == shelf.aisle) {
        streamer.postMessage({
          type: "Shelf",
          id: shelf.id
        });
      };

      // rack
      if (message.data.type == "Rack" && (
      message.data.action == "replace" ||
      message.data.action == "remove"
      ) && message.data.id == shelf.rack) {
        streamer.postMessage({
          type: "Shelf",
          id: shelf.id
        });
      };

    };
  };

  streamer.addEventListener("message", handler);
}
