"use client";

import { Label } from "@/components/label";
import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { Aisle } from "@/app/lib/types";

interface SelectAisleProps {
  dict_aisle_select: any;
  aisles: Aisle[];
  aisle: Aisle;
  setAisle: React.Dispatch<React.SetStateAction<Aisle>>;
}

export default function SelectAisle({
  aisles,
  aisle,
  setAisle,
  dict_aisle_select, 
  }: SelectAisleProps) {

  return (
    <>
      <div className="w-full">
        <input 
          required
          type="hidden" 
          id="aisle" 
          name="aisle" 
          value={aisle.id} />
        <Label>{dict_aisle_select.name}</Label>
        <ComboboxSelect 
          list={aisles}
          element={aisle} 
          setElement={setAisle}
          dict={dict_aisle_select.combobox} />
      </div>
    </>
  )
}
