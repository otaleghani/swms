import { Dispatch, SetStateAction } from "react";
import { 
  delaySyncStateToHidden, 
  delaySyncStateToNone, 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  SyncState,
  isRefreshMessage,
  ToastType,
} from "./utils";
import { TypeMapFilterSingles, TypeMap } from "./../types/requests";
import { SelectableItem } from "./../types/form/fields";

type ValidTypes = keyof Omit<TypeMapFilterSingles, 
  "ItemImagesPostBody" |
  "ProductImagesPostBody" |
  "ZoneWithExtra" |
  "AisleWithExtra" |
  "RackWithExtra" |
  "ShelfWithExtra" |
  "SupplierWithExtra" |
  "SupplierCodeWithExtra" >
import { FormMap } from "./../types/form/form";

export type SyncList<T extends SelectableItem> = {
  streamer: Worker,
  list: FormMap[T][],
  setList: Dispatch<SetStateAction<FormMap[T][]>>,
  type: T,
}

// This is used to synchronize long lists like selects
export function synchronizeList<T extends SelectableItem>({
  streamer,
  list,
  setList,
  type,
}: SyncList<T>) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isServerSentMessage(message.data)) {

      if (list && message.data.type == type) {
        if (message.data.action == "update") {
          //console.log("FIRED, update")
          const newElement = message.data.after;
          list = list.map(element => (
            element.id === newElement.id ? newElement : element
          ));
          setList(list);
        };

        if (message.data.action == "replace") {
          //console.log("FIRED, replace")
          const toPop = message.data.before;
          list = list.filter(element => (element.id !== toPop.id))

          setList(list)
          //setList(prevList => {
          //  const updatedList = prevList.filter(element => element.id !== toPop.id);
          //  return updatedList;
          //});
        };

        if (message.data.action == "remove") {
          //console.log("FIRED, remove")
          const toPop = message.data.before;
          list = list.filter(element => (element.id !== toPop.id))
          setList(list);
        };

        if (message.data.action == "create") {
          //console.log("FIRED, create")
          list = [...list, message.data.after]
          setList(list);
        }
      };
    };
  };

  streamer.addEventListener("message", handler);
}

type SyncPaginatedList<T extends SelectableItem> = SyncList<T> & {
  perPage: number
}

// Function that is used to synchronize paginted lists. This takes in a perPage 
// field that would be used to check if a breaking change occured or not.
export function synchronizePaginatedList<T extends SelectableItem>({
  streamer,
  list,
  setList,
  type,
  perPage
}:SyncPaginatedList<T>) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    
    if (isServerSentMessage(message.data)) {
      if (message.data.type == type) {
        // If an update action occured, we don't care about it, right?
        // Yes. We will just ignore it, reason why is cause the SyncElement would 
        // be the one handling this.
        //if (message.data.action == "update") {}
        
        // create is always non-breaking
        if (message.data.action == "create") {
          if (list.length < perPage) {
            // if the total length of a page is less than the total, we just want to 
            // append it to the end
            list = [...list, message.data.after]
            setList(list);
          }
        }

        // remove is breaking only if the removed item is in the page and the page
        // is filled (so it could have another page ahead of it.
        if (message.data.action == "remove" ||
            message.data.action == "replace") {
          const removedId = message.data.id
          // If the page is not filled, it means that we can safely remove things without
          // having to care about the next page.
          if (list.find((item) => item.id === removedId)) {
            if (list.length < perPage) {
              list = list.filter(element => (element.id !== removedId))
              setList(list);
            } else {
              // If the item was found and the page is filled (so it could have another
              // page ahead) it means that a breaking change occured, so
              // we want to propt the user to refresh the page.
              streamer.postMessage({
                refresh: true,
                type: type,
              })
            }
          }
        }

        // createInBulk got sunseted
        //if (message.data.action == "createInBulk") {}
      }
    }
  }
  
  streamer.addEventListener("message", handler);
}

// Function that would be used whenever a breaking change happens,
// such as a delete of items whenever the page has pagination full
export function synchronizeBreakingChange<T extends SelectableItem>(
  streamer: Worker,
  setShowToast: React.Dispatch<React.SetStateAction<ToastType>>,
  type: T
) {
  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isRefreshMessage(message.data)) {
      if (message.data.type == type) {
        if (message.data.refresh){
          setShowToast("success");
        } else {
          setShowToast("error");
        }
      }
    }
  }
  streamer.addEventListener("message", handler);
}

