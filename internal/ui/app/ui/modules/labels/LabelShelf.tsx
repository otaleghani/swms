import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Shelf } from "@/app/lib/types/data/shelfs"
import streamer from "@/app/lib/workers";
import { useState, useEffect, Dispatch, SetStateAction} from "react";

interface Props {
  shelf: Shelf;
  setShelf: Dispatch<SetStateAction<Shelf>>;
}

export default function LabelShelf({
  shelf,
  setShelf,
}: Props) {
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: shelf,
      setElement: setShelf,
      type: "Shelf",
    })
  }, []);

  return (
    <a
      href={`/shelfs/${shelf?.id}`}
      className={
        syncState === "remove" ? "animate-delete" :
        syncState === "update" ? "animate-update" :
        ""
      }
    >{shelf?.name}</a>
  )
}
