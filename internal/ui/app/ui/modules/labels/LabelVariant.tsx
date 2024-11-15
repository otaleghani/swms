
import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Variant } from "@/app/lib/types/data/variants"
import streamer from "@/app/lib/workers";
import { useState, useEffect, Dispatch, SetStateAction} from "react";

interface Props {
  variant: Variant;
  setVariant: Dispatch<SetStateAction<Variant>>;
}

export default function LabelVariant({
  variant,
  setVariant,
}: Props) {
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: variant,
      setElement: setVariant,
      type: "Variant",
    })
  }, []);

  return (
    <a
      href={`/variants/${variant?.id}`}
      className={
        syncState === "remove" ? "animate-delete" :
        syncState === "update" ? "animate-update" :
        ""
      }
    >{variant?.name}</a>
  )
}
