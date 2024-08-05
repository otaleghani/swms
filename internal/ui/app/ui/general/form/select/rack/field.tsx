"use client";

import { Label } from "@/components/label";
import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { Rack } from "@/app/lib/types";

interface SelectRackProps {
  dict_rack_select: any;
  racks: Rack[];
  rack: Rack;
  setRack: React.Dispatch<React.SetStateAction<Rack>>;
}

export default function SelectRack({
  racks,
  rack,
  setRack,
  dict_rack_select, 
  }: SelectRackProps) {

  return (
    <>
      <div className="w-full mb-2">
        <input 
          required
          type="hidden" 
          id="rack" 
          name="rack" 
          value={rack.id} />
        <Label>{dict_rack_select.name}</Label>
        <ComboboxSelect 
          list={racks}
          element={rack} 
          setElement={setRack}
          dict={dict_rack_select.combobox} />
      </div>
    </>
  )
}
