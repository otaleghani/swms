import { Shelfs, Shelf } from "@/app/lib/types/data/shelfs";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "items"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterShelfs = (
  params: SearchParams,
  shelfs: Shelfs,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [shelf, setShelf] = useState(
    params[type]?.filters?.shelf
    ? shelfs.find(
      (item) => item.id == params[type]?.filters?.shelf) 
        || {id: "", name: ""} as Shelf
    : {id: "", name: ""} as Shelf
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { shelf: shelf.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [shelf]);

  return { shelf, setShelf };
};
