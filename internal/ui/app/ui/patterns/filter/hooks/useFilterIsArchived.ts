import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "items"
  >;

export const useFilterIsArchived = (
  params: SearchParams,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [isArchived, setIsArchived] = useState(
    params[type]?.filters?.isArchived
    ? params[type]?.filters?.isArchived.toLowerCase() === "true"
    : false
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { isArchived: String(isArchived) }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
    console.log(newParams)
  }, [isArchived])

  const handleIsArchived = (checked: boolean | 'indeterminate') => {
    setIsArchived(checked as boolean)
  }

  return { isArchived, setIsArchived, handleIsArchived }
}
