"use client";

import { Label } from "@/components/label";
import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { Supplier } from "@/app/lib/types";

interface SelectSupplierProps {
  suppliers: Supplier[];
  supplier: Supplier;
  setSupplier: React.Dispatch<React.SetStateAction<Supplier>>;
  dict_supplier_select: any;
}

export default function SelectSupplier({
  suppliers,
  supplier,
  setSupplier,
  dict_supplier_select, 
  }: SelectSupplierProps) {

  return (
    <>
      <div className="w-full">
        <input 
          required
          type="hidden" 
          id="supplier" 
          name="supplier" 
          value={supplier.id} />
        <Label>{dict_supplier_select.name}</Label>
        <ComboboxSelect 
          list={suppliers}
          element={supplier} 
          setElement={setSupplier}
          dict={dict_supplier_select.combobox} />
      </div>
    </>
  )
}
