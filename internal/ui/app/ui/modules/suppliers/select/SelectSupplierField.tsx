"use client"

import { useState, useEffect } from "react"

import SelectFieldPattern from "@/app/ui/patterns/form/select/SelectFieldPattern"
import { SelectFieldProps } from "@/app/lib/types/form/fields"
import { emptySupplier, Supplier } from "@/app/lib/types/data/suppliers"

interface Props {
  fields: {
    supplier: {
      errorMessages: string[];
      type: "itemThatReplaces"
      defaultValue?: Supplier;
      select: SelectFieldProps<"Supplier">;
    }
  }
}

export default function SelectSupplierField({
  fields,
}: Props) {
  const [selectedSupplier, setSelectedSupplier] = useState(
    fields.supplier.defaultValue ? 
      fields.supplier.defaultValue : 
      emptySupplier
  )

  return (
    <>
      <SelectFieldPattern<"Supplier"> 
        name="Supplier"
        element={selectedSupplier}
        setElement={setSelectedSupplier}
        list={fields.supplier.select.list}
        dict={fields.supplier.select.dict}
        errorMessages={fields.supplier.errorMessages}
      />
      <input 
        type="hidden" 
        name={fields.supplier.type} 
        value={selectedSupplier.id} 
      />
    </>
  )
}
