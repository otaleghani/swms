"use client"

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";
import DialogFormPattern, { DialogFormPatternProps } from "../../patterns/dialog/DialogFormPattern";

/** Types and itnerfaces */
import { Zone, emptyZone } from "@/app/lib/types/data/zones";
import { Aisle, emptyAisle } from "@/app/lib/types/data/aisles";
import { Rack, emptyRack } from "@/app/lib/types/data/racks";
import { Shelf, emptyShelf } from "@/app/lib/types/data/shelfs";
import { SelectFieldProps } from "@/app/lib/types/form/fields";

/** Actions */
import { addNewItemToList, filterList } from "../../patterns/form/select/action";
import SelectFieldWithAddPattern from "../../patterns/form/select/SelectFieldWithAddPattern";

interface PositionSelectFieldWithAddProps {
  fields: {
    zone?: {
      errorMessages: string[];
      defaultValue?: Zone;
      select: SelectFieldProps<"Zone">;
      formDialog: DialogFormPatternProps<"Zone">;
    };
    aisle?: {
      errorMessages: string[];
      defaultValue?: Aisle;
      select: SelectFieldProps<"Aisle">;
      formDialog: DialogFormPatternProps<"Aisle">;
    }
    rack?: {
      errorMessages: string[];
      defaultValue?: Rack;
      select: SelectFieldProps<"Rack">;
      formDialog: DialogFormPatternProps<"Rack">;
    };
    shelf?: {
      errorMessages: string[];
      defaultValue?: Shelf;
      select: SelectFieldProps<"Shelf">;
      formDialog: DialogFormPatternProps<"Shelf">;
    };
  }
}

export default function PositionSelectFieldWithAdd({
  fields,
}: PositionSelectFieldWithAddProps) {
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

  const [listZone, setListZone] = useState(fields.zone?.select.list);
  const [listAisles, setListAisles] = useState(fields.aisle?.select.list);
  const [listRacks, setListRacks] = useState(fields.rack?.select.list);
  const [listShelfs, setListShelfs] = useState(fields.shelf?.select.list);

  const [filteredAisles, setFilteredAisles] = useState(fields.aisle?.select.list);
  const [filteredRacks, setFilteredRacks] = useState(fields.rack?.select.list);
  const [filteredShelfs, setFilteredShelfs] = useState(fields.shelf?.select.list);

  const refreshZoneList = (item: Zone) => {
    addNewItemToList(item, listZone, setListZone);
    setSelectedZone(item);
  };

  const refreshAisleList = (item: Aisle) => {
    addNewItemToList(item, listAisles, setListAisles);
    filterList(listAisles, "zone", selectedZone.id, setFilteredAisles);
    setSelectedAisle(item);
  }

  const refreshRackList = (item: Rack) => {
    addNewItemToList(item, listRacks, setListRacks);
    filterList(listRacks, "aisle", selectedAisle.id, setFilteredRacks);
    setSelectedRack(item);
  }

  const refreshShelfList = (item: Shelf) => {
    addNewItemToList(item, listShelfs, setListShelfs);
    filterList(listShelfs, "rack", selectedRack.id, setFilteredShelfs);
    setSelectedShelf(item);
  }

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
            <SelectFieldWithAddPattern<"Zone"> 
              addDialog={{
                ...fields.zone.formDialog,
              }}
              selectField={{
                ...fields.zone.select,
              }}
              element={selectedZone}
              setElement={setSelectedZone}
              errorMessages={fields.zone.errorMessages}
            />
            {
            // <SelectFieldPattern<"Zone"> 
            //   name="Zone"
            //   element={selectedZone}
            //   setElement={setSelectedZone}
            //   list={listZone}
            //   errorMessages={fields.zone.errorMessages}
            //   dict={fields.zone.select.dict}
            // />
            // <DialogFormPattern<"Zone"> 
            //   self={fields.zone.formDialog.self}
            //   formPattern={{
            //     ...fields.zone.formDialog.formPattern,
            //     form: {
            //       ...fields.zone.formDialog.formPattern.form,
            //       refreshItemList: refreshZoneList,
            //     }
            //   }}
            // />
            }
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
              dict={fields.aisle.select.dict}
            />
            <DialogFormPattern<"Aisle"> 
              self={fields.aisle.formDialog.self}
              formPattern={{
                ...fields.aisle.formDialog.formPattern,
                form: {
                  ...fields.aisle.formDialog.formPattern.form,
                  refreshItemList: refreshAisleList,
                }
              }}
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
              dict={fields.rack.select.dict}
            />
            <DialogFormPattern<"Rack"> 
              self={fields.rack.formDialog.self}
              formPattern={{
                ...fields.rack.formDialog.formPattern,
                form: {
                  ...fields.rack.formDialog.formPattern.form,
                  refreshItemList: refreshRackList,
                }
              }}
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
              dict={fields.shelf.select.dict}
            />
            <DialogFormPattern<"Shelf"> 
              self={fields.shelf.formDialog.self}
              formPattern={{
                ...fields.shelf.formDialog.formPattern,
                form: {
                  ...fields.shelf.formDialog.formPattern.form,
                  refreshItemList: refreshShelfList,
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
