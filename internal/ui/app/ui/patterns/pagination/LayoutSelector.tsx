"use client"

import { usePathname, useSearchParams } from "next/navigation";

import { LayoutGrid, LayoutList, Search } from "lucide-react";
import { SearchParams } from "@/app/lib/types/pageParams";
import { PaginationLink } from "../../components/pagination";
import { deepMerge, encodeSearchParams, decodeSearchParams } from "@/app/lib/searchParams";

interface LayoutSelectorProps {
  type: keyof SearchParams
}

function getLayout(params: SearchParams, type: keyof SearchParams) {
  if (params[type]?.pagination?.layout) {
    return params[type]?.pagination?.layout;
  }
  return 3;
}

type DefaultGridColumn = {
  [K in keyof SearchParams]: number;
}

const defaultGridColumn: DefaultGridColumn = {
  zones: 3,
  aisles: 3,
  racks: 3,
  shelfs: 3,
}

export default function LayoutSelector({
  type
}: LayoutSelectorProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentParams = decodeSearchParams(params.get("q"));
  const currentLayout = getLayout(currentParams, type)

  const createPageURL = (colNum: number | string) => {
    let diff: SearchParams = {};
    diff[type] = { ...{ pagination: { layout: Number(colNum) } } };
    const newParams = deepMerge({ ...currentParams }, diff);
    const newParamsString = encodeSearchParams(newParams);
    params.set("q", newParamsString);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="hidden xl:flex flex-row items-center gap-1">
      <PaginationLink className={
        "w-8 h-8 p-0 aspect-square" + currentLayout &&
        currentLayout > 1
        ? "pointer-events-none opacity-50"
        : ""
      }
      href={createPageURL(defaultGridColumn[type] as number)}
      >
        <LayoutGrid className="h-4 w-4" />
      </PaginationLink>

      <PaginationLink className={
        "w-8 h-8 p-0" + currentLayout &&
        currentLayout == 1
        ? "pointer-events-none opacity-50"
        : ""
      }
      href={createPageURL(1)}
      >
        <LayoutList className="h-4 w-4" />
      </PaginationLink>
    </div>
  )
}
