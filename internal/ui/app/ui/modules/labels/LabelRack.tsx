import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Rack } from "@/app/lib/types/data/racks"
import streamer from "@/app/lib/workers";
import { useState, useEffect, Dispatch, SetStateAction} from "react";

interface Props {
  rack: Rack;
  setRack: Dispatch<SetStateAction<Rack>>;
}

export default function LabelRack({
  rack,
  setRack,
}: Props) {
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: rack,
      setElement: setRack,
      type: "Rack",
    })
  }, []);

  return (
    <a
      href={`/racks/${rack?.id}`}
      className={
        syncState === "remove" ? "animate-delete" :
        syncState === "update" ? "animate-update" :
        ""
      }
    >{rack?.name}</a>
  )
}
