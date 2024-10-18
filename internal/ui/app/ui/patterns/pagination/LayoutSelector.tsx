"use client"

import { usePathname, useSearchParams } from "next/navigation";

import { LayoutGrid, LayoutList } from "lucide-react";
import { PaginationType, SearchParams } from "@/app/lib/types/pageParams";
import { PaginationLink } from "../../components/pagination";
import { deepMerge, encodeSearchParams, decodeSearchParams } from "@/app/lib/searchParams";

interface LayoutSelectorProps {
  type: PaginationType;
}

function getLayout(params: SearchParams, type: PaginationType) {
  if (params[type]?.pagination?.layout) {
    return params[type]?.pagination?.layout;
  }
  return 3;
}

type DefaultGridColumn = {
  [K in keyof SearchParams]: number;
}

const defaultGridColumn = {
  zones: 3,
  aisles: 3,
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
    <div className="flex flex-row items-center gap-1">
      <PaginationLink className={
        "w-8 h-8 p-0 aspect-square" + currentLayout &&
        currentLayout > 1
        ? "pointer-events-none opacity-50"
        : ""
      }
      href={createPageURL(defaultGridColumn[type])}
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
