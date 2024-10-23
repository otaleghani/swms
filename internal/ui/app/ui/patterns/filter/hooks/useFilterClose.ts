import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";
import { DateRange } from "react-day-picker"

type PossibleParams = keyof Pick<SearchParams, 
  "tickets"
  >;

export const useFilterClose = (
  params: SearchParams,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [close, setClose] = useState<DateRange | undefined>(
    params[type]?.filters?.close
    ? JSON.parse(params[type]?.filters?.close)
    : ""
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { close: JSON.stringify(close) }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [close])

  return { close, setClose }
}
