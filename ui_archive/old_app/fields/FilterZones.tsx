"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { decodeSearchParams, encodeSearchParams, deepMerge } from "@/app/lib/searchParams"

import { useEffect, useState } from "react"
import { Zone, Zones } from "@/app/lib/types/data/zones"
import { DictSelectField } from "@/app/lib/types/dictionary/form"
import { AllFiltersKey, SearchParams } from "@/app/lib/types/pageParams"

import { SelectFieldPatternCombobox } from "../form/select/SelectFieldPatternCombobox"

//type PossibleFilters = keyof Pick<SearchParams, "aisles">

interface Props {
  list: Zones,
  dict: DictSelectField,
  /** Is the field of the params that you want to chane */
  //filterParam: PossibleFilters;
  initialValue: string | undefined;
  updatePageURL: (s: string) => string;
}

// function getCurrentZoneFilter(
//   params: SearchParams,
//   filterParam: PossibleFilters,
// ) {
//   const filters = params[filterParam]?.filters;
//   if (filters) {
//     if (filters.zone) {
//       return filters.zone
//     };
//   };
//   return "";
// }

export default function FilterZones({
  list,
  dict,
  initialValue,
  updatePageURL,
}: Props) {
  //const pathname = usePathname();
  //const searchParams = useSearchParams();
  //const params = new URLSearchParams(searchParams);
  //const currentParams = decodeSearchParams(params.get("q"));
  //let currentFilter = getCurrentZoneFilter(currentParams, filterParam);
  
  const [element, setElement] = useState(
    initialValue
    ? list.find((item) => item.id == initialValue) as Zone
    : {id: "", name: ""} as Zone
  );

  useEffect(() => {
    const url = updatePageURL(element.id as string);
  }, [element])

  return (
    <>
      <SelectFieldPatternCombobox<"Zone"> 
        name="Zone"
        list={list}
        element={element}
        setElement={setElement}
        dict={dict}
      />
    </>
  )
}
