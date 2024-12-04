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
    const unitLenght = units.find(item => item.id === variant.lengthUnit);
    console.log(variant.height)
    console.log(unitLenght)
  }, [])

  return (
    <div>
      {variant.height}
    </div>
  )
}
