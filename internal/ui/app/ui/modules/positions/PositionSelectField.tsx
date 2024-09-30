"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

/** Types and itnerfaces */
import { Zone, emptyZone } from "@/app/lib/types/data/zones";
import { Aisle, emptyAisle } from "@/app/lib/types/data/aisles";
import { Rack, emptyRack } from "@/app/lib/types/data/racks";
import { Shelf, emptyShelf } from "@/app/lib/types/data/shelfs";
import { addNewItemToList, filterList } from "../../patterns/form/select/action";
import { SelectFieldProps } from "@/app/lib/types/form/fields";

export interface PositionSelectFieldProps {
  fields: {
    zone?: SelectFieldProps<"Zone">;
    aisle?: SelectFieldProps<"Aisle">;
    rack?: SelectFieldProps<"Rack">;
    shelf?: SelectFieldProps<"Shelf">; 
  }
}

export default function PositionSelectField({
  fields,
}: PositionSelectFieldProps) {
  const [selectedZone, setSelectedZone] = useState(emptyZone);
  const [selectedAisle, setSelectedAisle] = useState(emptyAisle);
  const [selectedRack, setSelectedRack] = useState(emptyRack);
  const [selectedShelf, setSelectedShelf] = useState(emptyShelf);

  const [listZone, setListZone] = useState(fields.zone?.list);
  const [listAisles, setListAisles] = useState(fields.aisle?.list);
  const [listRacks, setListRacks] = useState(fields.rack?.list);
  const [listShelfs, setListShelfs] = useState(fields.shelf?.list);

  const [filteredAisles, setFilteredAisles] = useState(fields.aisle?.list);
  const [filteredRacks, setFilteredRacks] = useState(fields.rack?.list);
  const [filteredShelfs, setFilteredShelfs] = useState(fields.shelf?.list);

  useEffect(() => {
    if (listAisles) {
      if (selectedAisle.zone !== selectedZone.id) {
        setSelectedAisle(emptyAisle);
        filterList(listAisles, "zone", selectedZone.id, setFilteredAisles);
      }
    }
  }, [selectedZone])

  useEffect(() => {
    if (listRacks) {
      if (selectedRack.aisle !== selectedAisle.id) {
        setSelectedRack(emptyRack);
        filterList(listRacks, "aisle", selectedAisle.id, setFilteredRacks);
      }
    }
  }, [selectedAisle])

  useEffect(() => {
    if (listShelfs) {
      if (selectedShelf.rack !== selectedRack.id) {
        setSelectedShelf(emptyShelf);
        filterList(listShelfs, "rack", selectedRack.id, setFilteredShelfs);
      }
    }
  }, [selectedRack])

  return (
    <div>
      <div>
        {fields.zone && listZone && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Zone"> 
              name="Zone"
              element={selectedZone}
              setElement={setSelectedZone}
              list={listZone}
              errorMessages={fields.zone.errorMessages}
              dict={fields.zone.dict}
            />
          </div>
        )}
        {fields.aisle && filteredAisles && (selectedZone != emptyZone) && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Aisle"> 
              name="Aisle"
              element={selectedAisle}
              setElement={setSelectedAisle}
              list={filteredAisles}
              errorMessages={fields.aisle.errorMessages}
              dict={fields.aisle.dict}
            />
          </div>
        )}
        {fields.rack && filteredRacks && (selectedAisle != emptyAisle) && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Rack"> 
              name="Rack"
              element={selectedRack}
              setElement={setSelectedRack}
              list={filteredRacks}
              errorMessages={fields.rack.errorMessages}
              dict={fields.rack.dict}
            />
          </div>
        )}
        {fields.shelf && filteredShelfs && (selectedRack != emptyRack) && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Shelf"> 
              name="Shelf"
              element={selectedShelf}
              setElement={setSelectedShelf}
              list={filteredShelfs}
              errorMessages={fields.shelf.errorMessages}
              dict={fields.shelf.dict}
            />
          </div>
        )}
      </div>
    </div>
  )
}
