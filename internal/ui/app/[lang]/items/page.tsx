import ComponentList from "@/app/ui/items/items-list";
import { Suspense } from "react";
import { revalidateTag } from "next/cache";

interface ItemsPageProps {
  searchParams: {
    query?: string,
    page?: string,
  }
}

export default function Page({ searchParams }: ItemsPageProps) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  if (currentPage === 5) {
    revalidateTag('collection');
  }

  return (
    <div className="grid xl:grid-cols-2">
      <Suspense fallback="LOADING">
        <ComponentList />
      </Suspense>
      <div>The skellington {query} {currentPage}</div>
    </div>
  )
}
