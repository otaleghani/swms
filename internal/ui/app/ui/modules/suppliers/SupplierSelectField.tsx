"use supplier" 

/** React hooks */
import { useState } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { emptySupplier } from "@/app/lib/types/data/suppliers";
import { SelectFieldProps } from "@/app/lib/types/form/fields";

export interface SupplierSelectFieldsProps {
  fields: {
    supplier?: {
      errorMessages: string[];
      select: SelectFieldProps<"Supplier">;
    },
  }
}

export default function SupplierSelectFields({
  fields
}: SupplierSelectFieldsProps) {
  const [selectedSupplier, setSelectedSupplier] = useState(emptySupplier);

  return (
    <div>
      <div>
        {fields.supplier && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Supplier"> 
              name="Supplier"
              element={selectedSupplier}
              setElement={setSelectedSupplier}
              list={fields.supplier.select.list}
              errorMessages={fields.supplier.errorMessages}
              dict={fields.supplier.select.dict}
            />
          </div>
        )}
      </div>
    </div>
  )
}
