import { Dispatch, SetStateAction } from "react";
import { ServerSentEventData } from "@/app/api/stream/route";

/** 
* Describes the state of a synchronization to play different animation
* based on action made on the server.
* 
* none:     no active change to display
* update:   plays an animation then returns to "done"
* remove:   plays an animation then goes to "done"
* done:     hides the element
**/ 
export type SyncState = "none" | "update" | "remove" | "hidden" | "new";

/**
* Describes the types of toasts that could occour whenever we notify
* the main thread of a change.
*
* none:     no synch at the time
* error:    a background process tryed the fetch but failed
* success:  Asks the user to refresh to view new data
**/
export type ToastType = "none" | "error" | "success" | "empty";
 
export type FetchResultMessage = {
  type: string;
  id: string;
  content: any;
  request: "create" | "replace" | "delete" | "error" | "refresh",
}

export type RefreshMessage = {
  type: string;
  refresh: boolean;
}

/** 
* Helper function that returns after a 550ms to SyncState "none".
* Used to make the animation finish even if the server already 
* returned the data.
**/
export const delaySyncStateToNone = (
  setChange: Dispatch<SetStateAction<SyncState>>
) => {
  return new Promise(resolve => {
    setTimeout(() => {
      setChange("none");
      resolve
    }, 550)
  });
}

/** 
* Helper function that returns after a 550ms to SyncState "done".
* Used to make the animation finish even if the server already 
* returned the data.
**/
export const delaySyncStateToHidden = (
  setChange: Dispatch<SetStateAction<SyncState>>
) => {
  return new Promise(resolve => {
    setTimeout(() => {
      setChange("hidden");
      resolve
    }, 550)
  });
}

export type WorkerMessage = ServerSentEventData | FetchResultMessage | RefreshMessage
export function isServerSentMessage(m: WorkerMessage): 
  m is ServerSentEventData {
    return (m as ServerSentEventData).after !== undefined;
}
export function isFetchResultMessage(m: WorkerMessage):
  m is FetchResultMessage {
  return (m as FetchResultMessage).content !== undefined;
}
export function isRefreshMessage(m: WorkerMessage):
  m is RefreshMessage {
  return (m as RefreshMessage).refresh !== undefined;
}
