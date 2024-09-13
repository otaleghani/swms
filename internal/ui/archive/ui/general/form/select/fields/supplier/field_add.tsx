"use client";

/** React hooks */
import { useState } from "react";

/** Types */
import { Supplier } from "@/app/lib/types";

/** Components */
import SelectSupplier from "./field";
import DialogAddSupplier from "../../../add/supplier/dialog";
import FormFieldError from "../../../error_field";

interface SelectSupplierWithAddProps {
  locale: string;
  suppliers: Supplier[];
  supplier: Supplier;
  setSupplier: React.Dispatch<React.SetStateAction<Supplier>>;
  dict_form_fields: any;
  dict_add_dialog: any;
  error_messages: string[];
}

export default function SelectSupplierWithAdd({
  locale,
  suppliers,
  supplier,
  setSupplier,
  dict_form_fields,
  dict_add_dialog,
  error_messages,
}: SelectSupplierWithAddProps) {

  const [suppliersList, setSuppliersList] = useState(suppliers);


  async function addNewSupplier(item: Supplier) {
    const list = suppliersList;
    list.push(item);
    setSuppliersList(list);
    setSupplier(item);
  }

  return (
    <div className="mb-2">
      <div className="flex items-end mb-2">
        <SelectSupplier 
          suppliers={suppliersList}
          supplier={supplier}
          setSupplier={setSupplier}
          dict_supplier_select={dict_form_fields.fields.suppliers.select}
        />
        <DialogAddSupplier 
          handleAddSupplier={addNewSupplier}
          locale={locale}
          dict_add_dialog={dict_add_dialog}
          dict_form_fields={dict_form_fields}
        />
      </div>
      <FormFieldError 
        id="supplier-errors"
        description={error_messages}
      />
    </div>
  )
}
