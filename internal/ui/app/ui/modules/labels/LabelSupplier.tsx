
import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Supplier } from "@/app/lib/types/data/suppliers"
import streamer from "@/app/lib/workers";
import { useState, useEffect, Dispatch, SetStateAction} from "react";

interface Props {
  supplier: Supplier;
  setSupplier: Dispatch<SetStateAction<Supplier>>;
}

export default function LabelSupplier({
  supplier,
  setSupplier,
}: Props) {
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: supplier,
      setElement: setSupplier,
      type: "Supplier",
    })
  }, []);

  return (
    <a
      href={`/suppliers/${supplier?.id}`}
      className={
        syncState === "remove" ? "animate-delete" :
        syncState === "update" ? "animate-update" :
        ""
      }
    >{supplier?.name}</a>
  )
}
