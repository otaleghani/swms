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
import { PaginationType } from "@/app/lib/types/pageParams";

import { usePathname, useSearchParams } from 'next/navigation';
import PageSizeSelector from "./PageSizeSelector";

interface PaginationPatternProps {
  totalPages: number;
  type: PaginationType;
}

function getPage(
  params: SearchParams, 
  type: PaginationType,
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
    diff[type] = { ...{ pagination: { page: Number(pageNumber) } } };
    const newParams = deepMerge({ ...currentParams }, diff);
    const newParamsString = encodeSearchParams(newParams);
    params.set("q", newParamsString);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="p-4 flex gap-4 items-center justify-end">
      <PageSizeSelector type={type} />
      <Pagination className="flex items-center">
        <div className="pr-2 text-sm font-medium">
          Page: {currentPage} / {totalPages}
        </div>
        <PaginationContent>
            <PaginationItem>
              <PaginationLink
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
