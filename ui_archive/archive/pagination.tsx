'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination"
import { usePathname, useSearchParams } from 'next/navigation';

interface Page {
  pageNumber: number,
  isEllipse: boolean,
}

export default function ItemsPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = GenerateItemsPagination(currentPage, totalPages)

  return (
    <Pagination className="p-4">
      <PaginationContent>
      {currentPage !== 1 && (
        <PaginationItem>
          <PaginationPrevious key="previous" href={createPageURL(currentPage-1)} />
        </PaginationItem>
      )}

        {pages.map((page: Page) => (
          <PaginationItem key={page.pageNumber} >
          {page.isEllipse ? (
            <PaginationEllipsis />
          ) : (
            page.pageNumber === currentPage ? (
              <PaginationLink isActive href={createPageURL(page.pageNumber)}>{page.pageNumber}</PaginationLink>
            ) : (
              <PaginationLink href={createPageURL(page.pageNumber)}>{page.pageNumber}</PaginationLink>
            )
          )}
          </PaginationItem>
        ))}

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext key="next"  href={createPageURL(currentPage+1)} />
          </PaginationItem>
        )}

      </PaginationContent>
    </Pagination>
  )
}

function GenerateItemsPagination(currentPage: number, totalPages: number) {
  const pageList: Page[] = []
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageList.push({ pageNumber: i, isEllipse: false } as Page)
    }
    return pageList
  }
  if (totalPages > 5 && currentPage <= 2) {
    pageList.push({ pageNumber: 1, isEllipse: false } as Page)
    pageList.push({ pageNumber: 2, isEllipse: false } as Page)
    pageList.push({ pageNumber: 3, isEllipse: true } as Page)
    pageList.push({ pageNumber: totalPages, isEllipse: false } as Page)
    return pageList
  }
  if (totalPages > 5 && currentPage >= totalPages - 2) {
    pageList.push({ pageNumber: 1, isEllipse: false } as Page)
    pageList.push({ pageNumber: 2, isEllipse: true } as Page)
    pageList.push({ pageNumber: totalPages - 2, isEllipse: false } as Page)
    pageList.push({ pageNumber: totalPages - 1, isEllipse: false } as Page)
    pageList.push({ pageNumber: totalPages, isEllipse: false } as Page)
    return pageList
  }
  pageList.push({ pageNumber: 1, isEllipse: false } as Page)
  pageList.push({ pageNumber: 2, isEllipse: true } as Page)
  pageList.push({ pageNumber: currentPage, isEllipse: false } as Page)
  pageList.push({ pageNumber: totalPages - 1, isEllipse: true } as Page)
  pageList.push({ pageNumber: totalPages, isEllipse: false } as Page)
  return pageList
}
