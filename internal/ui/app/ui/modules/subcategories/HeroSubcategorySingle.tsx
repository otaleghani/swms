"use client";

// Actions
import { useState, useEffect } from "react";
import { syncSubcategoryWithExtra } from "@/app/lib/synchronizers/extra/subcategories/single";

// Components
import { Warehouse } from "lucide-react";
import FetchToastPattern from "../../patterns/FetchToast";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { Category, Categories } from "@/app/lib/types/data/categories";
import { SubcategoryWithExtra } from "@/app/lib/types/data/subcategories";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFetchingToasts } from "@/app/lib/types/dictionary/toasts";
import LabelCategory from "../labels/LabelCategory";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

interface Props {
  item: SubcategoryWithExtra;
  dictCard: DictLabelList<"items" | "category">;
  dictToast: DictFetchingToasts;
  categoriesList: Categories;
}

export default function HeroSubcategorySingle({
  item,
  dictCard,
  dictToast,
  categoriesList
}: Props) {
  const [subcategoryWithExtra, setSubcategoryWithExtra] = useState(item);
  const [categories, setCategories] = useState(categoriesList)
  const [category, setCategory] = useState(categories.find(
    (category) => category.id === subcategoryWithExtra.subcategory.category
  ) as Category);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeList({
      streamer: streamer as Worker,
      list: categories,
      setList: setCategories,
      type: "Category",
    });

    syncSubcategoryWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: subcategoryWithExtra,
      setElement: setSubcategoryWithExtra,
    });
  }, []);

  useEffect(() => {
    setCategory(
      categoriesList.find(
        (category) => category.id === subcategoryWithExtra.subcategory.category
      ) as Category
    )
  }, [subcategoryWithExtra]);

  return (
    <header className="p-4 border-b">
      <h1 className="font-semibold text-2xl xl:text-2xl tracking-tight">
        {subcategoryWithExtra.subcategory.name}
      </h1>
      <span className="font-light">{subcategoryWithExtra.subcategory.id}</span>
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
              {subcategoryWithExtra.itemsCount}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.category}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              <LabelCategory 
                category={category}
                setCategory={setCategory}
              />
            </div>
          </div>
        </div>
      </div>
      <FetchToastPattern 
        type="Category"
        dict={dictToast}
        id={subcategoryWithExtra.subcategory.id as string}
      />
    </header>
  )
}
