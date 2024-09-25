"use client" 

/** React hooks */
import { useState, useEffect, SetStateAction, Dispatch } from "react";

/** Local components */
import ZoneSelectField from "../zones/misc/ZoneSelectField";
// aisles select field....

/** Types and itnerfaces */
import { Zone, Zones, emptyZone } from "@/app/lib/types/data/zones";
import { Aisle, Aisles, emptyAisle } from "@/app/lib/types/data/aisles";
import { Rack, Racks, emptyRack } from "@/app/lib/types/data/racks";
import { Shelf, Shelfs, emptyShelf } from "@/app/lib/types/data/shelfs";
import { DictSelectField } from "@/app/lib/types/dictionary/form";
import 
  ZoneAddDialog, 
  { ZoneCreateDialogProps } from "../zones/create/ZoneCreateDialog";
import { addNewItemToList, filterList } from "../../patterns/form/select/action";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictZoneForm } from "../zones/misc/ZoneForm";

type DictForms = {
  Zone: DictZoneForm;
  Aisle: ZoneCreateDialogProps;
  Rack: ZoneCreateDialogProps;
  Shelf: ZoneCreateDialogProps;
}

export type SelectFieldWithAddProps<T, K extends keyof DictForms> = {
  propsAddDialog: {
    self: {
      triggerType: "icon";
      dict: DictDialog;
    };
    propsForm: {
      dict: DictForms[K];
    }
  };
  propsSelectField: {
    dict: DictSelectField;
    errors: string[];
    list: T[];
  }
} 

export interface PositionSelectFieldProps {
  fields: {
    zone?: SelectFieldWithAddProps<Zone, "Zone">;
    aisle?: SelectFieldWithAddProps<Aisle, "Aisle">;
    rack?: SelectFieldWithAddProps<Rack, "Rack">;
    shelf?: SelectFieldWithAddProps<Shelf, "Shelf">;
  }
  // dict: DictSelectField;
}

export default function PositionSelectField({
  fields,
  // dict,
}: PositionSelectFieldProps) {
  const [selectedZone, setSelectedZone] = useState(emptyZone);
  const [selectedAisle, setSelectedAisle] = useState(emptyAisle);
  const [selectedRack, setSelectedRack] = useState(emptyRack);
  const [selectedShelf, setSelectedShelf] = useState(emptyShelf);

  const [listZone, setListZone] = useState(fields.zone?.propsSelectField.list);
  const [listAisles, setListAisles] = useState(fields.aisle?.propsSelectField.list);
  const [listRacks, setListRacks] = useState(fields.rack?.propsSelectField.list);
  const [listShelfs, setListShelfs] = useState(fields.shelf?.propsSelectField.list);

  const [filteredAisles, setFilteredAisles] = useState(fields.aisle?.propsSelectField.list);
  const [filteredRacks, setFilteredRacks] = useState(fields.rack?.propsSelectField.list);
  const [filteredShelfs, setFilteredShelfs] = useState(fields.shelf?.propsSelectField.list);

  const refreshZoneList = (item: Zone) => {
    addNewItemToList(item, listZone, setListZone);
  };

  const refreshAisleList = (item: Aisle) => {
    addNewItemToList(item, listAisles, setListAisles);
    filterList(listAisles, "zone", selectedZone.id, setFilteredAisles);
  }

  const refreshRackList = (item: Rack) => {
    addNewItemToList(item, listRacks, setListRacks);
    filterList(listRacks, "aisle", selectedAisle.id, setFilteredRacks);
  }

  const refreshShelfList = (item: Shelf) => {
    addNewItemToList(item, listShelfs, setListShelfs);
    filterList(listShelfs, "rack", selectedRack.id, setFilteredShelfs);
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
            <ZoneSelectField 
              list={listZone}
              element={selectedZone}
              setElement={setSelectedZone}
              dict={fields.zone.propsSelectField.dict}
              errors={fields.zone.propsSelectField.errors}
            />
            <ZoneAddDialog
              self={{
                triggerType: "icon",
                dict: fields.zone.propsAddDialog.self.dict
              }}
              propsZoneForm={{
                refreshItemList: refreshZoneList,
                dict: fields.zone.propsAddDialog.propsForm.dict
              }}
            />
          </div>
        )}



      </div>
    </div>
  )
}
