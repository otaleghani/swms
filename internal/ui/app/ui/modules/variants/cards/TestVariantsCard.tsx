"use client"

import { Unit } from "@/app/lib/types/data/units"
import { Variant } from "@/app/lib/types/data/variants"
import { useEffect } from "react"

interface Props {
  variant: Variant
  units: Unit[]
}

export default function TestVariantCard({
  variant,
  units
}: Props) {
  useEffect(() => {
    //console.log(variant)
    //console.log(unitLenght)
    const unitLenght = units.find(item => item.id === variant.lengthUnit);
  }, [])

  return (
    <div>
      {variant.height}
    </div>
  )
}
