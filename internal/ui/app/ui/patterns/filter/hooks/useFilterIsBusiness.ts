import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "clients"
  >;

export const useFilterIsBusiness = (
  params: SearchParams,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [isBusiness, setIsBusiness] = useState(
    params[type]?.filters?.isBusiness
    ? params[type]?.filters?.isBusiness.toLowerCase() === "true"
    : false
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { isBusiness: String(isBusiness) }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
    console.log(newParams)
  }, [isBusiness])

  const handleIsBusiness = (checked: boolean | 'indeterminate') => {
    setIsBusiness(checked as boolean)
  }

  return { isBusiness, setIsBusiness, handleIsBusiness }
}
