import { Racks, Rack } from "@/app/lib/types/data/racks";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "shelfs" |
  "items"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterRacks = (
  params: SearchParams,
  racks: Racks,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [rack, setRack] = useState(
    params[type]?.filters?.rack
    ? racks.find(
      (item) => item.id == params[type]?.filters?.rack) 
        || {id: "", name: ""} as Rack
    : {id: "", name: ""} as Rack
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { rack: rack.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [rack]);

  return { rack, setRack };
};
