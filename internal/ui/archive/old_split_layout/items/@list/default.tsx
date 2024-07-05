import ListItem from "@/app/[lang]/items/@list/list";
import { Suspense } from "react";

export default function ListItemPage() {
  return (
    <Suspense fallback="waiting...">
      <ListItem />
    </Suspense>
  )
}
