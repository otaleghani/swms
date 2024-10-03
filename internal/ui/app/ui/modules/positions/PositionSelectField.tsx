"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

/** Types and itnerfaces */
import { emptyZone } from "@/app/lib/types/data/zones";
import { emptyAisle } from "@/app/lib/types/data/aisles";
import { emptyRack } from "@/app/lib/types/data/racks";
import { emptyShelf } from "@/app/lib/types/data/shelfs";
import { filterList } from "../../patterns/form/select/action";
import { SelectFieldProps } from "@/app/lib/types/form/fields";
//import GenericSelectFields from "../../patterns/form/select/GenericSelectField";

interface PositionSelectFieldProps {
  fields: {
    zone?: {
      errorMessages: string[];
      select: SelectFieldProps<"Zone">;
    },
    aisle?: {
      errorMessages: string[];
      select: SelectFieldProps<"Aisle">;
    }
    rack?: {
      errorMessages: string[];
      select: SelectFieldProps<"Rack">;
    }
    shelf?: {
      errorMessages: string[];
      select: SelectFieldProps<"Shelf">;
    }
  }
}

export default function PositionSelectField({
  fields,
}: PositionSelectFieldProps) {
  const [selectedZone, setSelectedZone] = useState(emptyZone);
  const [selectedAisle, setSelectedAisle] = useState(emptyAisle);
  const [selectedRack, setSelectedRack] = useState(emptyRack);
  const [selectedShelf, setSelectedShelf] = useState(emptyShelf);

  const [listZones, setListZones] = useState(fields.zone?.select.list);
  const [listAisles, setListAisles] = useState(fields.aisle?.select.list);
  const [listRacks, setListRacks] = useState(fields.rack?.select.list);
  const [listShelfs, setListShelfs] = useState(fields.shelf?.select.list);

  const [filteredAisles, setFilteredAisles] = useState(fields.aisle?.select.list);
  const [filteredRacks, setFilteredRacks] = useState(fields.rack?.select.list);
  const [filteredShelfs, setFilteredShelfs] = useState(fields.shelf?.select.list);

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
        {fields.zone && listZones && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Zone"> 
              name="Zone"
              element={selectedZone}
              setElement={setSelectedZone}
              list={listZones}
              dict={fields.zone.select.dict}
              errorMessages={fields.zone.errorMessages}
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
              dict={fields.aisle.select.dict}
              errorMessages={fields.aisle.errorMessages}
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
              dict={fields.rack.select.dict}
              errorMessages={fields.rack.errorMessages}
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
              dict={fields.shelf.select.dict}
              errorMessages={fields.shelf.errorMessages}
            />
          </div>
        )}
      </div>
    </div>
  )
}
