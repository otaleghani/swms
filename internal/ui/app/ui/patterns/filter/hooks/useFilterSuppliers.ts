import { Suppliers, Supplier } from "@/app/lib/types/data/suppliers";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "supplierCodes"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterSuppliers = (
  params: SearchParams,
  suppliers: Suppliers,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [supplier, setSupplier] = useState(
    params[type]?.filters?.supplier
    ? suppliers.find(
      (item) => item.id == params[type]?.filters?.supplier) 
        || {id: "", name: ""} as Supplier
    : {id: "", name: ""} as Supplier
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { supplier: supplier.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [supplier]);

  return { supplier, setSupplier };
};
