import { Aisles, Aisle } from "@/app/lib/types/data/aisles";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "racks" |
  "shelfs" |
  "items"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterAisles = (
  params: SearchParams,
  aisles: Aisles,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [aisle, setAisle] = useState(
    params[type]?.filters?.zone
    ? aisles.find(
      (item) => item.id == params[type]?.filters?.aisle) 
        || {id: "", name: ""} as Aisle
    : {id: "", name: ""} as Aisle
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { aisle: aisle.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [aisle]);

  return { aisle, setAisle };
};
