import { DictToasts } from "@/app/lib/types/dictionary/toasts";

export const dictionaryToasts: DictToasts = {
  fetching: {
    success: {
      title: "Your view is out-of-data",
      description: "Refresh your page to see the newly added data.",
      button: "Refresh",
    },
    error: {
      title: "A background update failed",
      description: "Refresh you page to re-establish the connection. If this doesn't seem to work, contact your admin.",
      button: "Refresh",
    },
    empty: {
      title: "This item got deleted",
      description: "The item that you are currently watching got deleted. Return to the collection page to view the changes.",
      button: "Return",
    },
  }
}
