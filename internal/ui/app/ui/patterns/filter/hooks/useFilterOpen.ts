import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";
import { DateRange } from "react-day-picker"

type PossibleParams = keyof Pick<SearchParams, 
  "tickets"
  >;

export const useFilterOpen = (
  params: SearchParams,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {

  const [open, setOpen] = useState<DateRange | undefined>(
    params[type]?.filters?.open
    ? JSON.parse(params[type]?.filters?.open)
    : ""
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { open: JSON.stringify(open) }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [open])

  return { open, setOpen }
}
