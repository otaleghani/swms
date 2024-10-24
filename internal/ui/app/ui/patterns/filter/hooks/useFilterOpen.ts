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
  const [open, setOpen] = useState<DateRange | undefined>((): DateRange | undefined => {
    if (params[type]?.filters?.open) {
      try {
        const parsedOpen = typeof params[type].filters.open === "string"
          ? JSON.parse(params[type].filters.open)
          : params[type].filters.open;
        
        const fromDate = new Date(parsedOpen.from);
        const toDate = new Date(parsedOpen.to);

        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
          console.error("Invalid date format in open filter.");
          return undefined;
        }

        return { from: fromDate, to: toDate } as DateRange;
      } catch (error) {
        console.error("Failed to parse open filter:", error);
        return undefined;
      }
    }
  });

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { open: JSON.stringify({
      from: open?.from?.toISOString(),
      to: open?.to?.toISOString(),
    })}}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
    console.log(params[type]?.filters?.open)
  }, [open])

  return { open, setOpen }
}
