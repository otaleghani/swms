import { Items, Item } from "@/app/lib/types/data/items";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "operations" |
  "supplierCodes" |
  "variants"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterItems = (
  params: SearchParams,
  items: Items,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [item, setItem] = useState(
    params[type]?.filters?.item
    ? items.find(
      (item) => item.id == params[type]?.filters?.item) 
        || {id: "", name: ""} as Item
    : {id: "", name: ""} as Item
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { item: item.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [item]);

  return { item, setItem };
};
