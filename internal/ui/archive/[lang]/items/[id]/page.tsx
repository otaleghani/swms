import ItemList from "@/app/ui/items/list";
import SingleItem from "@/app/ui/items/single";
import { Suspense } from "react";

async function getData(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Page({ params }: { params: { id: string } }) {
  
  return (
    <div className="grid xl:grid-cols-2">
      <div className="hidden xl:block">
        <Suspense fallback="LOADING IN [id]">
          <ItemList />
        </Suspense>
      </div>
      <SingleItem />
    </div>
  )
}
