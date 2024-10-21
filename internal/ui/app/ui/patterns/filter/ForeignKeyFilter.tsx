"use client"

import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { SelectableItem } from "@/app/lib/types/form/fields"
import SelectFieldPattern from "../form/select/SelectFieldPattern"
import { FormMap } from "@/app/lib/types/form/form"
import { SelectFieldPatternCombobox } from "../form/select/SelectFieldPatternCombobox"

import { decodeSearchParams, encodeSearchParams } from '@/app/lib/searchParams';
import { AisleFiltersParams, AllFiltersKey, KeySearchParams, SearchParams, ZoneFiltersParams } from '@/app/lib/types/pageParams';
import { DictSelectField, DictSelectFieldCombobox } from '@/app/lib/types/dictionary/form';
import { FiltersMap } from '@/app/lib/types/pageParams';

// Associate all of the different types that could be filtered
// with them filters

function getFilter(
  params: SearchParams,
  type: KeySearchParams,
  key: AllFiltersKey,
) {
  const filters = params[type]?.filters;
  if (filters) {
    if (filters[key]) {
      return filters[key]
    }
  }
  return ""
}

interface Props<T extends SelectableItem> {
  name: T,
  list: FormMap[T][],
  type: KeySearchParams,
  dict: DictSelectField,
  key: AllFiltersKey,
}

export default function ForeignKeyFilter<T extends SelectableItem>({
  name,
  list,
  type,
  dict,
  key
}: Props<T>) {
  // Here we need the type to know which params to change
  // then we need to pass in the list of data to display
  // Then we need to create a useState with default value = currentParams..
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentParams = decodeSearchParams(params.get("q"));
  // extract the current filter
  let currentFilter = getFilter(currentParams, type, key)
    
  const [element, setElement] = useState(
    currentFilter != ""
    ? list.find((item) => item.id == currentFilter) as FormMap[T]
    : {id: "", name: ""} as FormMap[T]
  );

  const createPageURL = (filter: string) => {
    let diff: SearchParams = {};
    if (key == "zone") {
      let diffThing = { zone: filter } as FiltersMap[typeof type]
      diff["aisles"] = { ...{ filters: {...diffThing}}};
    }
  }

  return (
    <>
      <SelectFieldPatternCombobox<T> 
        name={name}
        list={list}
        element={element}
        setElement={setElement}
        dict={dict}
      />
    </>
  )
}
