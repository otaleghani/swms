import { Dispatch, SetStateAction } from "react"
import { ToastType, WorkerMessage, isServerSentMessage } from "./utils"

interface SynchronizeListProps {
  streamer: Worker,
  setShowToast: Dispatch<SetStateAction<ToastType>>,
  type: string[];
}
export function synchronizeList({
  streamer,
  setShowToast,
  type
}: SynchronizeListProps) {


  const handler = (message: MessageEvent<WorkerMessage>) => {
    if (isServerSentMessage(message.data)) {
      console.log(message.data)
      if (message.data.action == "create" ||
          message.data.action == "createInBulk") {
        if (type.includes(message.data.type)) {
          setShowToast("success");
        };
      };
    };
  };

  streamer.addEventListener("message", handler);
};
