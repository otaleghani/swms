"use supplier" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { Supplier, emptySupplier } from "@/app/lib/types/data/suppliers";
import { SelectFieldProps } from "@/app/lib/types/form/fields";
import DialogFormPattern, { DialogFormPatternProps } from "../../patterns/dialog/DialogFormPattern";

import { addNewItemToList } from "../../patterns/form/select/action";

export interface TagsSelectFieldsWithAddProps {
  fields: {
    supplier?: {
      errorMessages: string[];
      select: SelectFieldProps<"Supplier">;
      formDialog: DialogFormPatternProps<"Supplier">;
    },
  }
}

export default function SupplierSelectFieldsWithAdd({
  fields
}: TagsSelectFieldsWithAddProps) {
  const [selectedSupplier, setSelectedSupplier] = useState(emptySupplier);
  const [listSupplier, setListSupplier] = useState(fields.supplier?.select.list);

  const refreshSupplierList = (item: Supplier) => {
    addNewItemToList(item, listSupplier, setListSupplier);
    setSelectedSupplier(item);
  };

  return (
    <div>
      <div>
        {fields.supplier && listSupplier && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Supplier"> 
              name="Supplier"
              element={selectedSupplier}
              setElement={setSelectedSupplier}
              list={listSupplier}
              errorMessages={fields.supplier.errorMessages}
              dict={fields.supplier.select.dict}
            />
            <DialogFormPattern<"Supplier"> 
              self={fields.supplier.formDialog.self}
              formPattern={{
                ...fields.supplier.formDialog.formPattern,
                form: {
                  ...fields.supplier.formDialog.formPattern.form,
                  refreshItemList: refreshSupplierList,
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
