import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Subcategory } from "@/app/lib/types/data/subcategories"
import streamer from "@/app/lib/workers";
import { useState, useEffect, Dispatch, SetStateAction} from "react";
import { Badge } from "../../components/badge";

interface Props {
  subcategory: Subcategory;
  setSubcategory: Dispatch<SetStateAction<Subcategory>>;
}

export default function LabelSubcategory({
  subcategory,
  setSubcategory,
}: Props) {
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: subcategory,
      setElement: setSubcategory,
      type: "Subcategory",
    })
  }, []);

  return (
    <a
      href={`/subcategories/${subcategory?.id}`}
      className={
        syncState === "remove" ? "animate-delete" :
        syncState === "update" ? "animate-update" :
        ""
      }
    ><Badge variant="outline">{subcategory?.name}</Badge></a>
  )
}
