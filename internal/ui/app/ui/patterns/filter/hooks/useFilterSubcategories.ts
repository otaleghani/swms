import { Subcategories, Subcategory } from "@/app/lib/types/data/subcategories";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "items"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterSubcategories = (
  params: SearchParams,
  subcategories: Subcategories,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [subcategory, setSubcategory] = useState(
    params[type]?.filters?.subcategory
    ? subcategories.find(
      (item) => item.id == params[type]?.filters?.subcategory) 
        || {id: "", name: ""} as Subcategory
    : {id: "", name: ""} as Subcategory
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { subcategory: subcategory.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [subcategory]);

  return { subcategory, setSubcategory };
};
