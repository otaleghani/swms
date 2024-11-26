"use client"

import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

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
import { filterList } from "../../patterns/form/select/action";
import DialogZoneCreate from "../zones/dialogs/DialogZoneCreate";
import DialogAisleCreate from "../aisles/dialogs/DialogAisleCreate";
import DialogRackCreate from "../racks/dialogs/DialogRackCreate";
import DialogShelfCreate from "../shelfs/dialogs/DialogShelfCreate";

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

  const [openZoneDialog, setOpenZoneDialog] = useState(false);
  const [openAisleDialog, setOpenAisleDialog] = useState(false);
  const [openRackDialog, setOpenRackDialog] = useState(false);
  const [openShelfDialog, setOpenShelfDialog] = useState(false);

  // ATTENTION: | Solved
  // In the newer version we are using a normal variable instead of useState,
  // so that we could work with the syncher. Here we have to find a way to
  // do the same with the "with add" variants.
  const [listZones, setListZone] = useState(fields.zone?.select.list);
  const [listAisles, setListAisles] = useState(fields.aisle?.select.list);
  const [listRacks, setListRacks] = useState(fields.rack?.select.list);
  const [listShelfs, setListShelfs] = useState(fields.shelf?.select.list);

  const [filteredAisles, setFilteredAisles] = useState(fields.aisle?.select.list);
  const [filteredRacks, setFilteredRacks] = useState(fields.rack?.select.list);
  const [filteredShelfs, setFilteredShelfs] = useState(fields.shelf?.select.list);

  useEffect(() => {
    if (listZones) {
      synchronizeList<"Zone">({
        streamer: streamer as Worker,
        list: listZones,
        setList: setListZone as React.Dispatch<React.SetStateAction<Zone[]>>,
        type: "Zone",
        setSelected: setSelectedZone,
      });
    }
    if (listAisles) {
      synchronizeList<"Aisle">({
        streamer: streamer as Worker,
        list: listAisles,
        setList: setListAisles as React.Dispatch<React.SetStateAction<Aisle[]>>,
        type: "Aisle",
        setSelected: setSelectedAisle,
      });
    }
    if (listRacks) {
      synchronizeList<"Rack">({
        streamer: streamer as Worker,
        list: listRacks,
        setList: setListRacks as React.Dispatch<React.SetStateAction<Rack[]>>,
        type: "Rack",
        setSelected: setSelectedRack,
      });
    }
    if (listShelfs) {
      synchronizeList<"Shelf">({
        streamer: streamer as Worker,
        list: listShelfs,
        setList: setListShelfs as React.Dispatch<React.SetStateAction<Shelf[]>>,
        type: "Shelf",
        setSelected: setSelectedShelf,
      });
    }
  }, []);

  useEffect(() => {
    if (listAisles) {
      if (selectedAisle.zone !== selectedZone.id) {
        setSelectedAisle(emptyAisle);
        filterList(listAisles, "zone", selectedZone.id, setFilteredAisles);
      }
    }
    if (selectedZone.name == "") { setSelectedZone(emptyZone); }
    setOpenZoneDialog(false);
  }, [selectedZone])

  useEffect(() => {
    if (listRacks) {
      if (selectedRack.aisle !== selectedAisle.id) {
        setSelectedRack(emptyRack);
        filterList(listRacks, "aisle", selectedAisle.id, setFilteredRacks);
      }
    }
    if (selectedAisle.name == "") { setSelectedAisle(emptyAisle); }
    setOpenAisleDialog(false);
  }, [selectedAisle])

  useEffect(() => {
    if (listShelfs) {
      if (selectedShelf.rack !== selectedRack.id) {
        setSelectedShelf(emptyShelf);
        filterList(listShelfs, "rack", selectedRack.id, setFilteredShelfs);
      }
    }
    if (selectedRack.name == "") { setSelectedRack(emptyRack); }
    setOpenRackDialog(false);
  }, [selectedRack])

  useEffect(() => {
    setOpenShelfDialog(false);
  }, [selectedShelf])

  /** 
  * Here we need to add another useEffect to update the filteredList again
  * after we update the source list whenever a new item was added.
  * */
  useEffect(() => {
    filterList(listAisles, "zone", selectedZone.id, setFilteredAisles);
  }, [listAisles])
  useEffect(() => {
    filterList(listRacks, "aisle", selectedAisle.id, setFilteredRacks);
  }, [listRacks])
  useEffect(() => {
    filterList(listShelfs, "rack", selectedRack.id, setFilteredShelfs);
  }, [listShelfs])

  return (
    <div>
      <div>
      
        {fields.zone && listZones && (
          <div className="flex gap-2 items-end">
            <SelectFieldPattern<"Zone"> 
              name="Zone"
              element={selectedZone}
              setElement={setSelectedZone}
              list={listZones}
              errorMessages={fields.zone.errorMessages}
              dict={fields.zone.select.dict}
            />
            <DialogZoneCreate 
              open={openZoneDialog}
              setOpen={setOpenZoneDialog}
              dict={fields.zone.formDialog.self.dict}
              fields={{
                ...fields.zone.formDialog.formPattern.self.fields
              }}
            />
          </div>
        )}
        {fields.aisle && filteredAisles && (selectedZone != emptyZone) && (
          <div className="flex gap-2 items-end">
            <SelectFieldPattern<"Aisle"> 
              name="Aisle"
              element={selectedAisle}
              setElement={setSelectedAisle}
              list={filteredAisles}
              errorMessages={fields.aisle.errorMessages}
              dict={fields.aisle.select.dict}
            />
            <DialogAisleCreate
              open={openAisleDialog}
              setOpen={setOpenAisleDialog}
              dict={fields.aisle.formDialog.self.dict}
              fields={{
                ...fields.aisle.formDialog.formPattern.self.fields
              }}
              defaultZone={selectedZone}
            />
          </div>
        )}
        {fields.rack && filteredRacks && (selectedAisle != emptyAisle) && (
          <div className="flex gap-2 items-end">
            <SelectFieldPattern<"Rack"> 
              name="Rack"
              element={selectedRack}
              setElement={setSelectedRack}
              list={filteredRacks}
              errorMessages={fields.rack.errorMessages}
              dict={fields.rack.select.dict}
            />
            <DialogRackCreate
              open={openRackDialog}
              setOpen={setOpenRackDialog}
              dict={fields.rack.formDialog.self.dict}
              fields={{
                ...fields.rack.formDialog.formPattern.self.fields
              }}
              defaultAisle={selectedAisle}
            />
          </div>
        )}
        {fields.shelf && filteredShelfs && (selectedRack != emptyRack) && (
          <div className="flex gap-2 items-end">
            <SelectFieldPattern<"Shelf"> 
              name="Shelf"
              element={selectedShelf}
              setElement={setSelectedShelf}
              list={filteredShelfs}
              errorMessages={fields.shelf.errorMessages}
              dict={fields.shelf.select.dict}
            />
            <DialogShelfCreate
              open={openShelfDialog}
              setOpen={setOpenShelfDialog}
              dict={fields.shelf.formDialog.self.dict}
              fields={{
                ...fields.shelf.formDialog.formPattern.self.fields
              }}
              defaultRack={selectedRack}
            />
          </div>
        )}
      </div>
    </div>
  )
}
