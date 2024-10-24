import { Variants, Variant } from "@/app/lib/types/data/variants";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "transactions"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterVariants = (
  params: SearchParams,
  variants: Variants,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [variant, setVariant] = useState(
    params[type]?.filters?.variant
    ? variants.find(
      (item) => item.id == params[type]?.filters?.variant) 
        || {id: "", name: ""} as Variant
    : {id: "", name: ""} as Variant
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { variant: variant.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [variant]);

  return { variant, setVariant };
};
