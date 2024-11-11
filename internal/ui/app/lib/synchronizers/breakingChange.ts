import { isRefreshMessage, isServerSentMessage } from "./utils";
import { SelectableItem } from "../types/form/fields";
import { ToastType } from "./utils";
import { WorkerMessage } from "./utils";
import { ServerSentEventData } from "@/app/api/stream/route";

type SynchronizeBreakingChange<T extends SelectableItem> = {
  streamer: Worker,
  setShowToast: React.Dispatch<React.SetStateAction<ToastType>>,
  type: T,
  id: string
}

// A breaking change is just whenever a user is currently visiting a page
// that has been deleted. Here we check if the current page is
// beign either deleted or replaced.
export function synchronizeBreakingChange<T extends SelectableItem>({
  streamer,
  setShowToast,
  type,
  id,
}: SynchronizeBreakingChange<T>) {
  const handleServerSentMessage = (data: ServerSentEventData) => {
    if (data.type !== type) return;
    if (data.action !== "remove" && data.action !== "replace") return;
    if (data.before.id !== id) return;
    setShowToast("empty");
  }

  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isServerSentMessage(message.data)) { handleServerSentMessage(message.data )};
  }

  streamer.addEventListener("message", handler);
}
