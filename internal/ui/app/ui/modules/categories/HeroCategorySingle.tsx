"use client";

// Actions
import { useState, useEffect } from "react";
import { syncCategoryWithExtra } from "@/app/lib/synchronizers/extra/categories/single";

// Components
import { Warehouse } from "lucide-react";
import FetchToastPattern from "../../patterns/FetchToast";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { CategoryWithExtra } from "@/app/lib/types/data/categories";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFetchingToasts } from "@/app/lib/types/dictionary/toasts";

interface Props {
  item: CategoryWithExtra;
  dictCard: DictLabelList<"subcategories" | "items">;
  dictToast: DictFetchingToasts;
}

export default function HeroCategorySingle({
  item,
  dictCard,
  dictToast
}: Props) {
  const [categoryWithExtra, setCategoryWithExtra] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    // What happens if this is the element deleted?
    syncCategoryWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: categoryWithExtra,
      setElement: setCategoryWithExtra,
    });
  }, []);

  return (
    <header className="p-4 border-b">
      <h1 className="font-semibold text-2xl xl:text-2xl tracking-tight">
        {categoryWithExtra.category.name}
      </h1>
      <span className="font-light">{categoryWithExtra.category.id}</span>
      <div className="grid xl:grid-cols-2 gap-2 pt-4">

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.items}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              {categoryWithExtra.itemsCount}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.subcategories}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              {categoryWithExtra.subcategoriesCount}
            </div>
          </div>
        </div>
      </div>
      <FetchToastPattern 
        type="Category"
        dict={dictToast}
        id={categoryWithExtra.category.id as string}
      />
    </header>
  )
}
