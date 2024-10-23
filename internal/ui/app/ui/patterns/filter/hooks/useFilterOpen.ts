import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "tickets"
  >;

export const useFilterOpen = (
  params: SearchParams,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {

  const [open, setOpen] = useState(
    params[type]?.filters?.open
    ? params[type]?.filters?.open
    : ""
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { open: open }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [open])

  return { open, setOpen }
}
