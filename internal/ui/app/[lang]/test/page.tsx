import ComponentList from "./component";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="grid xl:grid-cols-2">
      <Suspense fallback="LOADING">
        <ComponentList />
      </Suspense>
      <div>The skellington</div>
    </div>
  )
}
