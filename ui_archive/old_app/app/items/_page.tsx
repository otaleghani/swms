import ItemList from "@/app/ui/items/list";
import { Suspense } from "react";
import { revalidateTag } from "next/cache";

interface ItemsPageProps {
  searchParams: {
    query?: string,
    page?: string,
  }
}

export default function ItemsPage({ searchParams }: ItemsPageProps) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  if (currentPage === 5) {
    revalidateTag('collection');
  }

  return (
    <div className="grid xl:grid-cols-2">
      <Suspense fallback="LOADING">
        <ItemList />
      </Suspense>
      <div className="hidden xl:block">The skellington {query} {currentPage}</div>
    </div>
  )
}
