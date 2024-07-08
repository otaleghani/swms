import SingleItem from "@/app/ui/items/item-single";
import ComponentList from "@/app/ui/items/items-list";
import { Suspense } from "react";

async function getData(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Page({ params }: { params: { id: string } }) {
  
  return (
    <div className="grid xl:grid-cols-2">
      <div className="hidden xl:block">
        <Suspense fallback="LOADING IN [id]">
          <ComponentList />
        </Suspense>
      </div>
      <SingleItem />
    </div>
  )
}
