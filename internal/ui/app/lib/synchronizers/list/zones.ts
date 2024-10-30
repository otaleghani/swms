import { Dispatch, SetStateAction } from "react";
import { 
  delaySyncStateToHidden, 
  delaySyncStateToNone, 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  SyncState,
} from "../utils";
import { TypeMapFilterSingles, TypeMap } from "../../types/requests";

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
  streamer: Worker,
  list: TypeMap[T][],
  setList: Dispatch<SetStateAction<TypeMap[T][]>>,
  type: T,
}

// This is used to synchronize long lists like selects
export function synchronizeList<T extends ValidTypes>({
  streamer,
  list,
  setList,
  type,
}: SyncElement<T>) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isServerSentMessage(message.data)) {

      if (list && message.data.type == type) {
        if (message.data.action == "update") {
          const newElement = message.data.after;
          list = list.map(element => (
            element.id === newElement.id ? newElement : element
          ));
          setList(list);
        };

        if (message.data.action == "replace") {
          const toPop = message.data.before;
          list = list.filter(element => (element.id !== toPop.id))

          setList(prevList => {
            const updatedList = prevList.filter(element => element.id !== toPop.id);
            return updatedList;
          });
        };

        if (message.data.action == "remove") {
          const toPop = message.data.before;
          list = list.filter(element => (element.id !== toPop.id))
          setList(list);
        };

        if (message.data.action == "create") {
          console.log("got here")
          list = [...list, message.data.after]
          setList(list);
        }


      };
    };
  };

  streamer.addEventListener("message", handler);
}

