"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination"
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { usePathname, useSearchParams } from 'next/navigation';

interface Page {
  pageNumber: number,
  isEllipse: boolean,
}

export default function PaginationPattern({ 
  totalPages 
}: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="p-4 flex items-center">
      <div className="pr-4">Page: {currentPage} / {totalPages}</div>
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
  )
}
