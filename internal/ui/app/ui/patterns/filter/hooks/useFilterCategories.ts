import { Categories, Category } from "@/app/lib/types/data/categories";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "subcategories" |
  "items"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterCategories = (
  params: SearchParams,
  categories: Categories,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [category, setCategory] = useState(
    params[type]?.filters?.category
    ? categories.find(
      (item) => item.id == params[type]?.filters?.category) 
        || {id: "", name: ""} as Category
    : {id: "", name: ""} as Category
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { category: category.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [category]);

  return { category, setCategory }
};
