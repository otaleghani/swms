import { ZoneWithExtra, ZonesWithExtra } from "@/app/lib/types/data/zones";
import { Dispatch, SetStateAction } from "react";
import { 
  delaySyncStateToHidden, 
  delaySyncStateToNone, 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  SyncState,
} from "../utils";

export function synchronizeZoneWithExtraSingle(
  streamer: Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  zoneWithExtra: ZoneWithExtra,
  setZoneWithExtra: Dispatch<SetStateAction<ZoneWithExtra>>,
) {
  const handler = (message: MessageEvent<WorkerMessage>) => {

    console.log(message.data)
    if (isFetchResultMessage(message.data)) {
      if (message.data.type == "ZoneWithExtra" && 
        message.data.content.zone.id == zoneWithExtra.zone.id) {
        setSyncState("update");
        setZoneWithExtra(message.data.content);
        delaySyncStateToNone(setSyncState);
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
          // e.g.
          // If an aisles was modified, and the aisles before has
          // a different zone than the aisle now, we want to update.
          streamer.postMessage({
             type: "ZoneWithExtra",
             id: zoneWithExtra.zone.id
          });
        }
        
        if (message.data.action == "create" || 
        message.data.action == "remove" ||
        message.data.action == "createInBulk" ||
        message.data.action == "replace") {
          // e.g.
          // If an aisle that has this zone was created, removed,
          // created in bulk or replaced, it means that the total
          // number of aisles of this item changed, hence we want
          // to update.
          streamer.postMessage({
             type: "ZoneWithExtra",
             id: zoneWithExtra.zone.id
          });
        }
      }

      if (message.data.type == "Zone" &&
      message.data.id == zoneWithExtra.zone.id) {
        if (message.data.action == "update") {
          streamer.postMessage({
             type: "ZoneWithExtra",
             id: zoneWithExtra.zone.id
          });
        }
        if (message.data.action == "replace") {
          if (message.data.before == zoneWithExtra.zone.id) {
            setSyncState("remove");
            delaySyncStateToHidden(setSyncState);
          } else {
            streamer.postMessage({
               type: "ZoneWithExtra",
               id: zoneWithExtra.zone.id
            });
          }
        }
        if (message.data.action == "remove") {
          setSyncState("remove");
          delaySyncStateToHidden(setSyncState);
        }
      };
    };
  };

  streamer.addEventListener("message", handler)
}

export function synchronizeZoneWithExtraList(
  streamer: Worker,
  zonesWithExtra: ZonesWithExtra,
  setZonesWithExtra: Dispatch<SetStateAction<ZonesWithExtra>>,
) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    console.log(message.data)

    if (isFetchResultMessage(message.data)) {
      console.log(message.data.content.zone.id)
      if (message.data.type == "ZoneWithExtra") {
        for (let i = 0; i < zonesWithExtra.length; i++) {
          if (zonesWithExtra[i].zone.id == 
              message.data.content.zone.id) {
            return;
          }
        }
        setZonesWithExtra([...zonesWithExtra, {
          ...message.data.content,
          isNew: true,
        }]);
      };
    }

    if (isServerSentMessage(message.data)) {
      if (message.data.type == "Zone" && (
      message.data.action == "create" || 
      message.data.action == "createInBulk")) {
        if (message.data.action == "create") {
          streamer.postMessage({
             type: "ZoneWithExtra",
             id: message.data.id,
          });
        }
        if (message.data.action == "createInBulk") {
          for (let i = 0; i < message.data.after; i++) {
            streamer.postMessage({
               type: "ZoneWithExtra",
               id: message.data.after[i],
            });
          }
        }
      };
    };
  };

  streamer.addEventListener("message", handler)
}
