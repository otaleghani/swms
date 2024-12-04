import { Unit } from "@/app/lib/types/data/units"
import TestVariantCard from "@/app/ui/modules/variants/cards/TestVariantsCard";
import { Variant, Variants } from "@/app/lib/types/data/variants"

interface Props {
  variants: Variants
  units: Unit[]
}
export default async function TestVariantList({
  variants,
  units
}: Props) {
  return (
    <div>
      {variants.map((item: Variant) => (
        <>
        <TestVariantCard 
          variant={item}
          units={units ? units : [] as Unit[]}
        />
        </>
      ))}
    </div>
  )
}
