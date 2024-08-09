"use client";

import { Label } from "@/components/label";
import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { Shelf } from "@/app/lib/types";

interface SelectShelfProps {
  dict_shelf_select: any;
  shelfs: Shelf[];
  shelf: Shelf;
  setShelf: React.Dispatch<React.SetStateAction<Shelf>>;
}

export default function SelectShelf({
  shelfs,
  shelf,
  setShelf,
  dict_shelf_select, 
  }: SelectShelfProps) {

  return (
    <>
      <div className="w-full mb-2">
        <input 
          required
          type="hidden" 
          id="shelf" 
          name="shelf" 
          value={shelf.id} />
        <Label>{dict_shelf_select.name}</Label>
        <ComboboxSelect 
          list={shelfs}
          element={shelf} 
          setElement={setShelf}
          dict={dict_shelf_select.combobox} />
      </div>
    </>
  )
}
