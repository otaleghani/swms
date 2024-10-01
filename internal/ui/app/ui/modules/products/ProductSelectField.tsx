"use product" 

/** React hooks */
import { useState } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { emptyProduct } from "@/app/lib/types/data/products";
import { SelectFieldProps } from "@/app/lib/types/form/fields";

export interface ProductSelectFieldsProps {
  fields: {
    product?: {
      errorMessages: string[];
      select: SelectFieldProps<"Product">;
    },
  }
}

export default function ProductSelectFields({
  fields
}: ProductSelectFieldsProps) {
  const [selectedProduct, setSelectedProduct] = useState(emptyProduct);

  return (
    <div>
      <div>
        {fields.product && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Product"> 
              name="Product"
              element={selectedProduct}
              setElement={setSelectedProduct}
              list={fields.product.select.list}
              errorMessages={fields.product.errorMessages}
              dict={fields.product.select.dict}
            />
          </div>
        )}
      </div>
    </div>
  )
}
