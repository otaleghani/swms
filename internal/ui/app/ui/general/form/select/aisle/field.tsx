"use client";

import { Label } from "@/components/label";
import { useState } from "react";
import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";

interface SelectZoneProps {
  dict_aisle_select: any;
  aisles: any;
}

export default function SelectZone({
  dict_aisle_select, aisles}: SelectZoneProps) {
  const [aisle, setAisle] = useState({id: "", name: ""});

  return (
    <>
      <div className="w-full mb-2">
        <input 
          type="hidden" 
          id="zone" 
          name="zone" 
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
