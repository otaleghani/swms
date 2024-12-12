import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";
import { DateRange } from "react-day-picker"

type PossibleParams = keyof Pick<SearchParams, 
  "operations"
  >;

export const useFilterDate = (
  params: SearchParams,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [date, setDate] = useState<DateRange | undefined>((): DateRange | undefined => {
    if (params[type]?.filters?.date) {
      try {
        const parsedOpen = typeof params[type].filters.date === "string"
          ? JSON.parse(params[type].filters.date)
          : params[type].filters.date;
        
        const fromDate = new Date(parsedOpen.from);
        const toDate = new Date(parsedOpen.to);

        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
          console.error("Invalid date format in date filter.");
          return undefined;
        }

        return { from: fromDate, to: toDate } as DateRange;
      } catch (error) {
        console.error("Failed to parse date filter:", error);
        return undefined;
      }
    }
  });

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { date: JSON.stringify({
      from: date?.from?.toISOString(),
      to: date?.to?.toISOString(),
    })}}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
    console.log(params[type]?.filters?.date)
  }, [date])

  return { date, setDate }
}
