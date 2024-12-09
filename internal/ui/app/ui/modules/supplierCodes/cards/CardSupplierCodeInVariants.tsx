"use client"
import { useState } from "react";
import { SupplierCode } from "@/app/lib/types/data/supplierCodes";
import { Supplier } from "@/app/lib/types/data/suppliers";
import LabelSupplier from "../../labels/LabelSupplier";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import DialogSupplierEdit from "../../suppliers/dialogs/DialogSupplierEdit";
import DialogSupplierCodeDelete from "../dialogs/DialogSupplierCodeDelete";
import DialogSupplierCodeEdit from "../dialogs/DialogSupplierCodeEdit";

interface Props {
  supplier: Supplier
  supplierCode: SupplierCode
  dialogEdit: {
    fields: {
      code: InputFieldProps;
      supplier: SelectFieldProps<"Supplier">;
      item: SelectFieldProps<"Item">;
      variant: SelectFieldProps<"Variant">;
      button: DictFormButton;
    };
    dict: DictDialog,
  };
  dialogDelete: {
    fields: {
      button: DictFormButton;
    };
    dict: DictDialog,
  };
}

// How do I sync lets say a change in the supplier
export default function CardSupplierCodeInVariants({
  supplier,
  supplierCode,
  dialogEdit,
  dialogDelete
}: Props) {
  const [currentSupplier, setCurrentSupplier] = useState(supplier);
  const [currentSupplierCode, setCurrentSupplierCode] = useState(supplierCode);

  return (
    <>
      <div key={currentSupplierCode.id} className="grid grid-cols-3 items-center text-xs py-2 border-b">
        <div>{currentSupplierCode.code}</div>
        <div>
          <LabelSupplier 
            supplier={currentSupplier}
            setSupplier={setCurrentSupplier}
          />
        </div>
        <div className="justify-self-end flex gap-1">
          <DialogSupplierCodeEdit 
            xSmall
            fields={dialogEdit.fields}
            supplierCode={currentSupplierCode}
            dict={dialogEdit.dict}
          />
          <DialogSupplierCodeDelete 
            xSmall
            fields={dialogDelete.fields}
            supplierCode={currentSupplierCode}
            dict={dialogDelete.dict}
          />
        </div>
      </div>
    </>
  );
};
