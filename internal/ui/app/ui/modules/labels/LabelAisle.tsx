import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Aisle } from "@/app/lib/types/data/aisles"
import streamer from "@/app/lib/workers";
import { useState, useEffect, Dispatch, SetStateAction} from "react";
import { Badge } from "../../components/badge";

interface Props {
  aisle: Aisle;
  setAisle: Dispatch<SetStateAction<Aisle>>;
}

export default function LabelAisle({
  aisle,
  setAisle,
}: Props) {
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: aisle,
      setElement: setAisle,
      type: "Aisle",
    })
  }, []);

  return (
    <a
      href={`/aisles/${aisle?.id}`}
      className={
        syncState === "remove" ? "animate-delete" :
        syncState === "update" ? "animate-update" :
        ""
      }
    ><Badge variant="outline">{aisle?.name}</Badge></a>
  )
}
