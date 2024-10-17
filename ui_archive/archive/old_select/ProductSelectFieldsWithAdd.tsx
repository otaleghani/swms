"use product" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { Product, emptyProduct } from "@/app/lib/types/data/products";
import { SelectFieldProps } from "@/app/lib/types/form/fields";
import DialogFormPattern, { DialogFormPatternProps } from "../../patterns/dialog/DialogFormPattern";

import { addNewItemToList } from "../../patterns/form/select/action";

export interface TagsSelectFieldsWithAddProps {
  fields: {
    product?: {
      errorMessages: string[];
      select: SelectFieldProps<"Product">;
      formDialog: DialogFormPatternProps<"Product">;
    },
  }
}

export default function ProductSelectFieldsWithAdd({
  fields
}: TagsSelectFieldsWithAddProps) {
  const [selectedProduct, setSelectedProduct] = useState(emptyProduct);
  const [listProduct, setListProduct] = useState(fields.product?.select.list);

  const refreshProductList = (item: Product) => {
    addNewItemToList(item, listProduct, setListProduct);
    setSelectedProduct(item);
  };

  return (
    <div>
      <div>
        {fields.product && listProduct && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Product"> 
              name="Product"
              element={selectedProduct}
              setElement={setSelectedProduct}
              list={listProduct}
              errorMessages={fields.product.errorMessages}
              dict={fields.product.select.dict}
            />
            <DialogFormPattern<"Product"> 
              self={fields.product.formDialog.self}
              formPattern={{
                ...fields.product.formDialog.formPattern,
                form: {
                  ...fields.product.formDialog.formPattern.form,
                  refreshItemList: refreshProductList,
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
