import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Item } from "@/app/lib/types/data/items"
import streamer from "@/app/lib/workers";
import { useState, useEffect, Dispatch, SetStateAction} from "react";

interface Props {
  item: Item;
  setItem: Dispatch<SetStateAction<Item>>;
}

export default function LabelItem({
  item,
  setItem,
}: Props) {
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: item,
      setElement: setItem,
      type: "Item",
    })
  }, []);

  return (
    <a
      href={`/items/${item?.id}`}
      className={
        syncState === "remove" ? "animate-delete" :
        syncState === "update" ? "animate-update" :
        ""
      }
    >{item?.name}</a>
  )
}
