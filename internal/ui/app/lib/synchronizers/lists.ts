import { Dispatch, SetStateAction } from "react";
import { 
  isServerSentMessage, 
  isFetchResultMessage, 
  WorkerMessage,
  FetchResultMessage,
} from "./utils";
import { TypeMapFilterSingles } from "./../types/requests";
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

  /** Used in selects with add to add the new item as the selected one */
  setSelected?: Dispatch<SetStateAction<FormMap[T]>>,
}

// This is used to synchronize full lists like selects.
export function synchronizeList<T extends SelectableItem>({
  streamer,
  list,
  setList,
  type,
  setSelected
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
        const replaceElement = data.before;
        list = list.filter(e => (e.id !== replaceElement.id));
        setList(list);
        break;
      case "remove":
        const removeElement = data.after;
        list = list.filter(e => (e.id !== removeElement.id));
        setList(list);
        break;
      case "create":
        data.after.id = data.id;
        list = [...list, data.after];
        setList(list);

        // Testing out new updater
        if (setSelected) {
          //console.log("firedSelected: ", data.type)
          //console.log(data.after)
          //console.log(list)
          setSelected(data.after);
        }

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
