import { Products, Product } from "@/app/lib/types/data/products";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "tickets"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterProducts = (
  params: SearchParams,
  products: Products,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [product, setProduct] = useState(
    params[type]?.filters?.product
    ? products.find(
      (item) => item.id == params[type]?.filters?.product) 
        || {id: "", name: ""} as Product
    : {id: "", name: ""} as Product
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { product: product.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [product]);

  return { product, setProduct };
};
