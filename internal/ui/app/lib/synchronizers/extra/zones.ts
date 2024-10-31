import { ZoneWithExtra } from "@/app/lib/types/data/zones";
import { Dispatch, SetStateAction } from "react";
import { 
  delaySyncStateToHidden, 
  delaySyncStateToNone, 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  SyncState,
} from "../utils";

export type SyncZonesWithExtra = {
  streamer: Worker,
  list: ZoneWithExtra[],
  setList: Dispatch<SetStateAction<ZoneWithExtra[]>>,
}

export function synchronizeZonesWithExtraList({
  streamer,
  //setSyncState,
  list,
  setList
}: SyncZonesWithExtra) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) {
      if (message.data.type == "ZoneWithExtra") {
        if (message.data.request == "error") {
          console.log("something went wrong with client side fetching");
        }

        if (message.data.request == "create") {
          console.log("got here")
          //list.push(message.data.content);
          //const newList = list
          //setList(newList);
          const newData = message.data.content
          list = [...list, newData]
          setList((prev) => [...prev, newData]);
          console.log(list)
        }
        if (message.data.request == "replace") {
          //const toUpdate = message.data.content.zone.id;
          //const index = list.findIndex((e) => e.zone.id === toUpdate)
          //list[index] = message.data.content
          //const newList = list;
          //setList(newList)
          //console.log(list)
        }
        if (message.data.request == "delete") {
          const toDelete = message.data.content.zone.id
          list = list.filter(item => item !== toDelete);
          setList((prev) => prev.filter(item => item !== toDelete));
        }

      }
    }

    if (isServerSentMessage(message.data)) {
      if (list && message.data.type == "Zone") {

        if (message.data.action == "update") {
          const newElement = message.data.after;
          list = list.map(element => (
            element.zone.id === newElement.id ? {...element, zone: newElement} : element
          ));
          setList(list);
        };

        if (message.data.action == "replace") {
          const toPop = message.data.before.id;
          list = list.filter((item) => item.zone.id !== toPop);
          setList(list);

          // Here we fetch client side the data
          streamer.postMessage({
            type: "ZoneWithExtra",
            id: message.data.after.id,
            request: "replace"
          })
        }

        if (message.data.action == "create") {
          streamer.postMessage({
            type: "ZoneWithExtra",
            id: message.data.after.id,
            request: "create"
          });
        }

      }
    }
  }
  streamer.addEventListener("message", handler)
}

type SyncZoneWithExtra = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: ZoneWithExtra;
  setElement: Dispatch<SetStateAction<ZoneWithExtra>>,
}

export function synchronizeZoneWithExtra({
  streamer,
  setSyncState,
  element,
  setElement,
}: SyncZoneWithExtra) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    // If a fetch comes back it means that either:
    // - a related aisle or item got changed
    // - a zone was created
    // - a zone was replaced
    if (isFetchResultMessage(message.data)) {
      if (message.data.type == "ZoneWithExtra" &&
      message.data.id == element.zone.id) {
        setSyncState("update");
        element = message.data.content;
        setElement(element);
        delaySyncStateToNone(setSyncState);
      };
    };

    if (isServerSentMessage(message.data)) {
      // If the zone was updated, we want to update it here.
      if (message.data.action == "update" &&
      message.data.type == "Zone" &&
      message.data.id == element.zone.id) {
        setSyncState("update");
        element = {...element, zone: message.data.after};
        setElement(element);
        delaySyncStateToNone(setSyncState);
      }

      // Everytime an Aisle or an Item get's changed, this function 
      // checks if that change impacted this zone. If yes, we just
      // re-fetch that data. If no, we ignore.
      if (( message.data.type == "Aisle" ||
      message.data.type == "Item") &&
      (message.data.after.zone == element.zone.id ||
      message.data.before.zone == element.zone.id)) {
        if (message.data.before.zone != message.data.after.zone) {
          streamer.postMessage({
            type: "ZoneWithExtra",
            id: element.zone.id,
            request: "update"
          })
        };
      };
      
      // aisles
      // items
      
      // For everything I just want to get fetch the new data 
      // and place it.

        //if (message.data.action == "update") {
  //cons//t [zone, setZone] = useState(item.zone);
        //  setSyncState("update");
        //  element = message.data.after;
        //  setElement(message.data.after);
        //  delaySyncStateToNone(setSyncState);
        //};

        //if (message.data.action == "replace") {
        //  if (message.data.before.id == element.id &&
        //      message.data.before.id != message.data.after.id) {
        //    console.log("REPLACED FIRED IN ELEMENT")
        //    setSyncState("remove");
        //    //element = message.data.after;
        //    //setElement(message.data.after);
        //    delaySyncStateToNone(setSyncState);
        //  };
        //};

        //if (message.data.action == "remove") {
        //  setSyncState("remove");
        //  delaySyncStateToHidden(setSyncState);
        //};
    };
  };

  streamer.addEventListener("message", handler);
}
