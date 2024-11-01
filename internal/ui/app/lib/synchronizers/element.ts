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
  isFetchResultMessage, 
  WorkerMessage,
  SyncState,
} from "./utils";
import { TypeMapFilterSingles, TypeMap } from "./../types/requests";

type ValidTypes = keyof Omit<TypeMapFilterSingles, 
  "ItemImagesPostBody" |
  "ProductImagesPostBody" |
  "ZoneWithExtra" |
  "AisleWithExtra" |
  "RackWithExtra" |
  "ShelfWithExtra" |
  "SupplierWithExtra" |
  "SupplierCodeWithExtra" >


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
  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isServerSentMessage(message.data)) {
      if (element && message.data.type == type &&
      message.data.id == element.id) {

        if (message.data.action == "update") {
  //const [zone, setZone] = useState(item.zone);
          setSyncState("update");
          element = message.data.after;
          setElement(message.data.after);
          delaySyncStateToNone(setSyncState);
        };

        if (message.data.action == "replace") {
          if (message.data.before.id == element.id &&
              message.data.before.id != message.data.after.id) {
            //console.log("REPLACED FIRED IN ELEMENT")
            setSyncState("remove");
            element = message.data.after;
            setElement(message.data.after);
            delaySyncStateToNone(setSyncState);
          };
        };

        if (message.data.action == "remove") {
          setSyncState("remove");
          delaySyncStateToHidden(setSyncState);
        };
      };
    };
  };

  streamer.addEventListener("message", handler);
}
