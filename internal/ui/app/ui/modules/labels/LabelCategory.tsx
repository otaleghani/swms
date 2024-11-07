import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Category } from "@/app/lib/types/data/categories"
import streamer from "@/app/lib/workers";
import { useState, useEffect, Dispatch, SetStateAction} from "react";
import { Badge } from "../../components/badge";

interface Props {
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
}

export default function LabelCategory({
  category,
  setCategory,
}: Props) {
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: category,
      setElement: setCategory,
      type: "Category",
    })
  }, []);

  return (
    <a
      href={`/subcategories/${category?.id}`}
      className={
        syncState === "remove" ? "animate-delete" :
        syncState === "update" ? "animate-update" :
        ""
      }
    ><Badge>{category?.name}</Badge></a>
  )
}
