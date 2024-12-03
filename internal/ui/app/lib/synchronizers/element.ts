// Generic function used in every type that doesn't have related data to
// other tables. 
//
// e.g. Zone has no external correlation, so can use this syncher
// e.g. Aisle has some foreign keys but no external correlation in it's 
// data. Hence it can use this and it's own specific syncher to handle
// foreign key changes.
// e.g. AisleWithExtra cannot work with this because all of it's data is
// related to other tables, like Aisle, Zones and Items. Hence it needs
// it's own implementation.
import { Dispatch, SetStateAction } from "react";
import { 
  delaySyncStateToHidden, 
  delaySyncStateToNone, 
  isServerSentMessage, 
  WorkerMessage,
  SyncState,
} from "./utils";
import { TypeMapFilterSingles, TypeMap } from "./../types/requests";
import { ServerSentEventData } from "@/app/api/stream/route";

type ValidTypes = keyof Omit<TypeMapFilterSingles, 
  "ItemImagesPostBody" |
  "ProductImagesPostBody" |
  "ZoneWithExtra" |
  "AisleWithExtra" |
  "RackWithExtra" |
  "ShelfWithExtra" |
  "SupplierWithExtra" |
  "SupplierCodeWithExtra" |
  "CategoryWithExtra" |
  "SubcategoryWithExtra">

export type SyncElement<T extends ValidTypes> = {
  streamer:  Worker,
  setSyncState: Dispatch<SetStateAction<SyncState>>,
  element: TypeMap[T],
  setElement: Dispatch<SetStateAction<TypeMap[T]>>,
  type: T,
}

/** Generic version of the synchronizer that handles
* element specific changes, like direct update, delete, replace.
* It's mainly used in generic cards and widgets for foreign keys
* */
export function synchronizeElement<T extends ValidTypes>({
  streamer,
  setSyncState,
  element,
  setElement,
  type,
}: SyncElement<T>) {
  const handleServerSentMessage = (data: ServerSentEventData) => {
    if (!element || data.type !== type || data.id !== element.id) return;
    switch (data.action) {
      case "update": 
        setSyncState("update");
        element = data.after;
        setElement(element);
        delaySyncStateToNone(setSyncState)
        break;
      case "replace":
        setSyncState("update");
        element = data.after;
        setElement(element);
        delaySyncStateToNone(setSyncState)
        break;
      case "remove": 
        setSyncState("remove");
        delaySyncStateToHidden(setSyncState);
        break;
    };
  };

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) }
  };

  streamer.addEventListener("message", handler);
}
