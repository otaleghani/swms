import { AisleWithExtra } from "@/app/lib/types/data/aisles";
import { Dispatch, SetStateAction } from "react";
import { 
  delaySyncStateToHidden, 
  delaySyncStateToNone, 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  SyncState,
} from "../utils";
import { Zone } from "../../types/data/zones";

export type SyncAisleWithExtra = {
  streamer: Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  aisleWithExtra: AisleWithExtra,
  setAisleWithExtra: Dispatch<SetStateAction<AisleWithExtra>>,
  setZone: Dispatch<SetStateAction<Zone>>,
}

export function synchronizeAisleWithExtraSingle({
  streamer,
  setSyncState,
  aisleWithExtra,
  setAisleWithExtra,
  setZone,
}: SyncAisleWithExtra) {
  const handler = (message: MessageEvent<WorkerMessage>) => {

    if (isFetchResultMessage(message.data)) {
      console.log(aisleWithExtra.aisle.id)
      if (message.data.type == "AisleWithExtra" && 
      message.data.content.aisleWithExtra.aisle.id == aisleWithExtra.aisle.id) {
      console.log(message.data)
        setSyncState("update");
        setAisleWithExtra(message.data.content.aisleWithExtra);
        setZone(message.data.content.zone);
        delaySyncStateToNone(setSyncState);
      };
    }

    if (isServerSentMessage(message.data)) {
      // Change on side foreign keys
      if ((message.data.type == "Rack" ||
        message.data.type == "Item") && (
        message.data.before.aisle == aisleWithExtra.aisle.id ||
        message.data.after.aisle == aisleWithExtra.aisle.id
      )) {

        if (message.data.action == "update" &&
        message.data.after.aisle != message.data.before.aisle) {
          streamer.postMessage({
             type: "AisleWithExtra",
             id: aisleWithExtra.aisle.id
          });
        }
        
        if (message.data.action == "create" || 
        message.data.action == "remove" ||
        message.data.action == "createInBulk" ||
        message.data.action == "replace") {
          streamer.postMessage({
             type: "AisleWithExtra",
             id: aisleWithExtra.aisle.id
          });
        }
      }

      // Direct change of item
      if (message.data.type == "Aisle" &&
      message.data.id == aisleWithExtra.aisle.id) {
        if (message.data.action == "update") {
          streamer.postMessage({
             type: "AisleWithExtra",
             id: aisleWithExtra.aisle.id
          });
        }

        if (message.data.action == "replace") {
          if (message.data.before.id == aisleWithExtra.aisle.id &&
              message.data.before.id != message.data.after.id) {
            setSyncState("remove");
            delaySyncStateToHidden(setSyncState);
          } 
        }

        if (message.data.action == "remove") {
          setSyncState("remove");
          delaySyncStateToHidden(setSyncState);
        }
      };

      if (message.data.type == "Zone" && 
      (message.data.before.id == aisleWithExtra.aisle.zone ||
      message.data.after.id == aisleWithExtra.aisle.zone)) {
        streamer.postMessage({
          type: "AisleWithExtra",
          id: aisleWithExtra.aisle.id,
        });
        //streamer.postMessage({
        //  type: "Zone",
        //  id: message.data.after.id
        //});
      }
    };
  };

  streamer.addEventListener("message", handler)
}
