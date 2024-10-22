import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof SearchParams;

export const useFilterSearch = (
  params: SearchParams,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [searchTerm, setSearchTerm] = useState(
    params[type]?.filters?.search
    ? params[type]?.filters?.search
    : ""
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { search: searchTerm }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [searchTerm])

  const handleInput = (value: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value.target.value);
  }

  return { searchTerm, setSearchTerm, handleInput }
}
