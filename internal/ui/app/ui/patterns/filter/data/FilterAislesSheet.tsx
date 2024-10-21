"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { SearchParams } from "@/app/lib/types/pageParams";
import { deepMerge, decodeSearchParams, encodeSearchParams } from "@/app/lib/searchParams";
import { Zones } from "@/app/lib/types/data/zones";
import { DictSelectField } from "@/app/lib/types/dictionary/form";

import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
import { SheetTrigger } from "@/app/ui/components/sheet";

interface Props {
  zones: {
    items: Zones;
    dict: DictSelectField;
  }
}

// Get the current zone if it exists

export default function FilterAislesSheet() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentParams = decodeSearchParams(params.get("q"));

  currentParams.aisles

  const updatePageURLZone = (filter: string) => {
    let diff: SearchParams = {};
    diff["aisles"] = { ...{ filters: { zone: filter }}};
    const newParams = deepMerge({...currentParams}, diff)
    const newParamsString = encodeSearchParams(newParams);
    params.set("q", newParamsString);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <SheetWrapper
        Trigger={() => (<SheetTrigger>Sus</SheetTrigger>)}
        Body={() => (<>sus</>)}
      />
    </>
  )
}
