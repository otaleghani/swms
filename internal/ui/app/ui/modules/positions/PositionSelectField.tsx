"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

/** Types and itnerfaces */
import { emptyZone, Zone } from "@/app/lib/types/data/zones";
import { Aisle, emptyAisle } from "@/app/lib/types/data/aisles";
import { emptyRack, Rack } from "@/app/lib/types/data/racks";
import { emptyShelf, Shelf } from "@/app/lib/types/data/shelfs";
import { filterList } from "../../patterns/form/select/action";
import { SelectFieldProps } from "@/app/lib/types/form/fields";

interface PositionSelectFieldProps {
  fields: {
    zone?: {
      errorMessages: string[];
      defaultValue?: Zone,
      select: SelectFieldProps<"Zone">;
      type?: "itemThatReplaces" | "itemToDelete"
    },
    aisle?: {
      errorMessages: string[];
      defaultValue?: Aisle;
      select: SelectFieldProps<"Aisle">;
      type?: "itemThatReplaces" | "itemToDelete"
    }
    rack?: {
      errorMessages: string[];
      defaultValue?: Rack;
      select: SelectFieldProps<"Rack">;
      type?: "itemThatReplaces" | "itemToDelete"
    }
    shelf?: {
      errorMessages: string[];
      defaultValue?: Shelf;
      select: SelectFieldProps<"Shelf">;
      type?: "itemThatReplaces" | "itemToDelete"
    }
  }
}

export default function PositionSelectField({
  fields,
}: PositionSelectFieldProps) {
  const [selectedZone, setSelectedZone] = useState(
    fields.zone?.defaultValue ?
      fields.zone.defaultValue :
      emptyZone
  );
  const [selectedAisle, setSelectedAisle] = useState(
    fields.aisle?.defaultValue ?
      fields.aisle.defaultValue :
      emptyAisle
  );
  const [selectedRack, setSelectedRack] = useState(
    fields.rack?.defaultValue ?
      fields.rack.defaultValue :
      emptyRack
  );
  const [selectedShelf, setSelectedShelf] = useState(
    fields.shelf?.defaultValue ?
      fields.shelf.defaultValue :
      emptyShelf
  );

  let listZones = fields.zone?.select.list;
  let listAisles = fields.aisle?.select.list;
  let listRacks = fields.rack?.select.list;
  let listShelfs = fields.shelf?.select.list;

  const [filteredAisles, setFilteredAisles] = useState(listAisles);
  const [filteredRacks, setFilteredRacks] = useState(listRacks);
  const [filteredShelfs, setFilteredShelfs] = useState(listShelfs);


  useEffect(() => {
    if (fields.zone && fields.zone.defaultValue && listAisles) {
      filterList(listAisles, "zone", selectedZone.id, setFilteredAisles);
    }
    if (fields.aisle && fields.aisle.defaultValue && listRacks) {
      filterList(listRacks, "aisle", selectedAisle.id, setFilteredRacks);
    }
    if (fields.rack && fields.rack.defaultValue && listShelfs) {
      filterList(listShelfs, "rack", selectedRack.id, setFilteredShelfs);
    }
  }, [])
  
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
            {fields.zone.type && (
              <input type="hidden" name={fields.zone.type} value={selectedZone.id} />
            )} 
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
            {fields.aisle.type && (
              <input type="hidden" name={fields.aisle.type} value={selectedAisle.id} />
            )} 
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
            {fields.rack.type && (
              <input type="hidden" name={fields.rack.type} value={selectedRack.id} />
            )} 
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
            {fields.shelf.type && (
              <input type="hidden" name={fields.shelf.type} value={selectedShelf.id} />
            )} 
          </div>
        )}
      </div>
    </div>
  )
}
