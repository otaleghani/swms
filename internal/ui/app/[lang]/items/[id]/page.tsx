import { retrieve } from "@/app/lib/requests/generics/retrieve"
import { Unit } from "@/app/lib/types/data/units";
import { Variants } from "@/app/lib/types/data/variants";
import TestVariantList from "@/app/ui/modules/variants/lists/TestVariantList";

export default async function ItemIdPage() {
  const variants = await retrieve({
    request: "Variants",
    paginationOff: "true"
  });
  const units = await retrieve({
    request: "Units",
    paginationOff: "true"
  })

  return (
    <div>
      <TestVariantList 
        variants={variants.data as Variants}
        units={units.data as Unit[]}
      />
    </div>
  )
}
