"use client";

import { Label } from "@/components/label";
import { useState } from "react";
import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";

interface SelectZoneProps {
  dict_zone_select: any;
  zones: any;
}

export default function SelectZone({
  dict_zone_select, zones}: SelectZoneProps) {
  const [zone, setZone] = useState({id: "", name: ""});

  return (
    <>
      <div className="w-full mb-2">
        <input 
          type="hidden" 
          id="zone" 
          name="zone" 
          value={zone.id} />
        <Label>{dict_zone_select.name}</Label>
        <ComboboxSelect 
          list={zones}
          element={zone} 
          setElement={setZone}
          dict={dict_zone_select.combobox} />
      </div>
    </>
  )
}
