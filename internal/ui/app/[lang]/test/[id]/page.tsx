import ComponentList from "../component";
import { Suspense } from "react";

async function getData(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Page({ params }: { params: { id: string } }) {
  
  return (
    <div className="grid xl:grid-cols-2">
      <Suspense fallback="LOADING IN [id]">
        <ComponentList />
      </Suspense>
      <div>The component {params.id}</div>
    </div>
  )
}
