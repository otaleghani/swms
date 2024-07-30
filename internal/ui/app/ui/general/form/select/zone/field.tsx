"use client";

import { Label } from "@/components/label";
import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { Zone } from "@/app/lib/types";

interface SelectZoneProps {
  zones: Zone[];
  zone: Zone;
  setZone: React.Dispatch<React.SetStateAction<Zone>>;
  dict_zone_select: any;
}

export default function SelectZone({
  zones,
  zone,
  setZone,
  dict_zone_select, 
  }: SelectZoneProps) {

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
