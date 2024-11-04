import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  isRefreshMessage,
  ToastType,
  FetchResultMessage,
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
import { ServerSentEventData } from "@/app/api/stream/route";
import { PaginationParams } from "../types/pageParams";

export type SyncList<T extends SelectableItem> = {
  streamer: Worker,
  list: FormMap[T][],
  setList: Dispatch<SetStateAction<FormMap[T][]>>,
  type: T,
}

// This is used to synchronize full lists like selects.
export function synchronizeList<T extends SelectableItem>({
  streamer,
  list,
  setList,
  type,
}: SyncList<T>) {
  const handleServerSentMessage = (data: ServerSentEventData) => {
    if (!list || data.type !== type) return;
    switch (data.action) {
      case "update":
        const newElement = data.after;
        list = list.map(e => (e.id === newElement.id ? newElement : e));
        setList(list);
        break;
      case "replace":
      case "remove":
        const popElement = data.after;
        list = list.filter(e => (e.id !== popElement.id));
        setList(list);
        break;
      case "create":
        list = [...list, data.after];
        setList(list);
        break;
      case "createInBulk": 
        streamer.postMessage({
          type: type,
          paginationOff: true,
          request: "refresh",
        });
        break;
    };
  };

  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== type || data.request !== "refresh") return;
    list = data.content;
    setList(list);
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
  }
  streamer.addEventListener("message", handler);
}

type SyncPaginatedList<T extends SelectableItem> = {
  pagination?: PaginationParams;
  filters?: any;
  streamer: Worker;
  list: FormMap[T][];
  setList: Dispatch<SetStateAction<FormMap[T][]>>;
  type: T;
}

// Function that is used to synchronize paginted lists. This takes in a perPage 
// field that would be used to check if a breaking change occured or not.
export function synchronizePaginatedList<T extends SelectableItem>({
  pagination,
  filters,
  streamer,
  list,
  setList,
  type
}: SyncPaginatedList<T>) {
  const handleFetchResultMessage = (data: FetchResultMessage) => {
    if (data.type !== type) return;
    switch (data.request) {
      case "error": 
        console.error("Something went wrong with client-side fetching");
        break;
      case "refresh":
        list = data.content;
        setList(list);
        break;
    };
  }

  const handleServerSentMessage = (data: ServerSentEventData) => {
    if (data.type !== type) return;
    if (data.action !== "update") {
      streamer.postMessage({
        type: type,
        page: pagination?.page,
        perPage: pagination?.perPage,
        filters: JSON.stringify(filters),
        request: "refresh",
      });
    };
  };

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isFetchResultMessage(message.data)) { handleFetchResultMessage(message.data) };
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data) };
  }
  streamer.addEventListener("message", handler);
}

// TO ARCHIVE
// Function that would be used whenever a breaking change happens,
// such as a delete of items whenever the page has pagination full
//export function synchronizeBreakingChange<T extends SelectableItem>(
//  streamer: Worker,
//  setShowToast: React.Dispatch<React.SetStateAction<ToastType>>,
//  type: T
//) {
//  const handler = (message: MessageEvent<WorkerMessage>) => {
//    if (isRefreshMessage(message.data)) {
//      if (message.data.type == type) {
//        if (message.data.refresh){
//          setShowToast("success");
//        } else {
//          setShowToast("error");
//        }
//      }
//    }
//  }
//  streamer.addEventListener("message", handler);
//}
