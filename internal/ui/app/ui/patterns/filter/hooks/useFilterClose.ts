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
  const [close, setClose] = useState<DateRange | undefined>((): DateRange | undefined => {
    if (params[type]?.filters?.close) {
      try {
        const parsedOpen = typeof params[type].filters.close === "string"
          ? JSON.parse(params[type].filters.close)
          : params[type].filters.close;
        
        const fromDate = new Date(parsedOpen.from);
        const toDate = new Date(parsedOpen.to);

        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
          console.error("Invalid date format in close filter.");
          return undefined;
        }

        return { from: fromDate, to: toDate } as DateRange;
      } catch (error) {
        console.error("Failed to parse close filter:", error);
        return undefined;
      }
    }
  });

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { close: JSON.stringify({
      from: close?.from?.toISOString(),
      to: close?.to?.toISOString(),
    }) }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
    console.log(params[type]?.filters?.close)
  }, [close])

  return { close, setClose }
}
