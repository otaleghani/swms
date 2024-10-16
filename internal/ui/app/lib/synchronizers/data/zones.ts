import { ZoneWithExtra } from "@/app/lib/types/data/zones";
import { Dispatch, SetStateAction } from "react";
import { 
  delaySyncStateToDone, 
  delaySyncStateToNone, 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  SyncState,
} from "../utils";

export function synchronizeZoneWithExtraSingle(
  streamer: Worker,
  syncState: SyncState,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  zoneWithExtra: ZoneWithExtra,
  setZoneWithExtra: Dispatch<SetStateAction<ZoneWithExtra>>,
) {

  const handler = (message: MessageEvent<WorkerMessage>) => {

    if (isFetchResultMessage(message.data)) {
      if (message.data.type == "ZoneWithExtra" && 
        message.data.content.zone.id == zoneWithExtra.zone.id) {
        setSyncState("update");
        setZoneWithExtra(message.data.content);
        delaySyncStateToDone(setSyncState);
      };
    }

    if (isServerSentMessage(message.data)) {
      if ((message.data.type == "Aisle" ||
        message.data.type == "Item") && (
        message.data.before.zone == zoneWithExtra.zone.id ||
        message.data.after.zone == zoneWithExtra.zone.id
      )) {
        // If the before zone OR the after zone have this zone
        // we want to do something about it
        if (message.data.action == "update" &&
        message.data.after.zone != message.data.before.zone) {
          // If an aisles was modified, and the aisles before has
          // a different zone than the aisle now, we want to update.
          streamer?.postMessage({
             type: "ZoneWithExtra",
             id: zoneWithExtra.zone.id
          });
        }
        
        if (message.data.action == "create" || 
        message.data.action == "remove" ||
        message.data.action == "createInBulk" ||
        message.data.action == "replace") {
          // If an aisle that has this zone was created, removed,
          // created in bulk or replaced, it means that the total
          // number of aisles of this item changed, hence we want
          // to update.
          streamer?.postMessage({
             type: "ZoneWithExtra",
             id: zoneWithExtra.zone.id
          });
        }
      }

      // Create is impossible here, but possible in other
      // createInBulk is impossible, but possible in other
      //
      // update is possible...
      // replace is possible...
      // delete is possible...
      if (message.data.type == "Zone" &&
      message.data.id == zoneWithExtra.zone.id) {
        if (message.data.action == "update") {
          streamer?.postMessage({
             type: "ZoneWithExtra",
             id: zoneWithExtra.zone.id
          });
        }
        if (message.data.action == "replace") {
          // which am I?
          // am I a
        }
      };
    };
  };

  streamer?.addEventListener("message", handler)
}
