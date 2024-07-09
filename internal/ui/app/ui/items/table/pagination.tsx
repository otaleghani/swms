'use client'

import Link from "next/link";
import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from "@/components/button";

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

  return (
    <nav className="flex gap-2 p-4 justify-end items-center">
      <div className="text-sm font-semibold pr-4">Page {currentPage} of {totalPages}</div>
      <Button disabled={currentPage === 1 ? true : false} size="icon" variant="outline">
        <Link href={createPageURL(1)}>
          <ChevronsLeft className="h-4 w-4"/>
        </Link>
      </Button>
      <Button disabled={currentPage === 1 ? true : false} size="icon" variant="outline">
        <Link href={createPageURL(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4"/>
        </Link>
      </Button>
      <Button disabled={currentPage === totalPages ? true : false} size="icon" variant="outline">
        <Link href={createPageURL(currentPage + 1)}>
          <ChevronRight className="h-4 w-4"/>
        </Link>
      </Button>
      <Button disabled={currentPage === totalPages ? true : false} size="icon" variant="outline">
        <Link href={createPageURL(totalPages)}>
          <ChevronsRight className="h-4 w-4"/>
        </Link>
      </Button>
    </nav>
  )
}
