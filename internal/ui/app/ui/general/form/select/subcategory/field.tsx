"use client";

import { Label } from "@/components/label";
import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { Subcategory } from "@/app/lib/types";

interface SelectSubcategoryProps {
  subcategories: Subcategory[];
  subcategory: Subcategory;
  setSubcategory: React.Dispatch<React.SetStateAction<Subcategory>>;
  dict_subcategory_select: any;
}

export default function SelectSubcategory({
  subcategories,
  subcategory,
  setSubcategory,
  dict_subcategory_select, 
  }: SelectSubcategoryProps) {

  return (
    <>
      <div className="w-full">
        <input 
          required
          type="hidden" 
          id="subcategory" 
          name="subcategory" 
          value={subcategory.id} />
        <Label>{dict_subcategory_select.name}</Label>
        <ComboboxSelect 
          list={subcategories}
          element={subcategory} 
          setElement={setSubcategory}
          dict={dict_subcategory_select.combobox} />
      </div>
    </>
  )
}
