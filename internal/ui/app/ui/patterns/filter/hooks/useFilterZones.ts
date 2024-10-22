import { Zones, Zone } from "@/app/lib/types/data/zones";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Omit<SearchParams, "zones">;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterZones = (
  params: SearchParams,
  zones: Zones,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [zone, setZone] = useState(
    params[type]?.filters?.zone
    ? zones.find(
      (item) => item.id == params[type]?.filters?.zone) 
        || {id: "", name: ""} as Zone
    : {id: "", name: ""} as Zone
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { zone: zone.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [zone]);

  return { zone, setZone };
};
