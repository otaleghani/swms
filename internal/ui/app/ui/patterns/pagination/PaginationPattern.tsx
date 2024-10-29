"use client"

import { decodeSearchParams, deepMerge, encodeSearchParams } from "@/app/lib/searchParams";
import { SearchParams } from "@/app/lib/types/pageParams";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/ui/components/pagination"
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { usePathname, useSearchParams } from 'next/navigation';
import PageSizeSelector from "./PageSizeSelector";
import LayoutSelector from "./LayoutSelector";

interface PaginationPatternProps {
  totalPages: number;
  type: keyof SearchParams;
}

function getPage(
  params: SearchParams, 
  type: keyof SearchParams,
  totalPages: number,
) {
  if (params[type]?.pagination?.page) {
    if (params[type].pagination.page > totalPages) {
      return 1;
    }
    return params[type]?.pagination?.page;
  }
  return 1;
}

export default function PaginationPattern({ 
  totalPages,
  type
}: PaginationPatternProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const currentParams = decodeSearchParams(params.get("q"));
  let currentPage = getPage(currentParams, type, totalPages)

  const createPageURL = (pageNumber: number | string) => {
    let diff: SearchParams = {};
    diff[type] = { ...{ pagination: { page: Number(pageNumber)}}};
    const newParams = deepMerge({ ...currentParams }, diff);
    const newParamsString = encodeSearchParams(newParams);
    params.set("q", newParamsString);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="p-2 flex gap-4 items-center justify-end flex-wrap">
      <LayoutSelector type={type} />
      <PageSizeSelector type={type} />
      <Pagination className="flex items-center">
        <div className="pr-2 text-sm font-medium">
          Page: {currentPage} / {totalPages}
        </div>
        <PaginationContent>
            <PaginationItem>
              <PaginationLink
                size="default"
                key="next"  
                href={createPageURL(1)} 
                className={
                  currentPage <= 1
                    ? "pointer-events-none opacity-50" 
                    : undefined
                }>
                <ChevronsLeft className="h-4 w-4"/>
                </PaginationLink>
            </PaginationItem>
          <PaginationItem>
            <PaginationPrevious 
              size="default"
              key="previous"  
              href={createPageURL(currentPage-1)} 
              className={
                currentPage <= 1 
                  ? "pointer-events-none opacity-50" 
                  : undefined
              }
            />
          </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                size="default"
                key="next"  
                href={createPageURL(currentPage+1)} 
                className={
                  currentPage >= totalPages 
                    ? "pointer-events-none opacity-50" 
                    : undefined
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                size="default"
                key="next"  
                href={createPageURL(totalPages)} 
                className={
                  currentPage >= totalPages 
                    ? "pointer-events-none opacity-50" 
                    : undefined
                }>
                <ChevronsRight className="h-4 w-4"/>
                </PaginationLink>
            </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  )
}
