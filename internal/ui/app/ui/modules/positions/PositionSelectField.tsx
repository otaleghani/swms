"use client" 

/** React hooks */
import { useState, useEffect } from "react";

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
import { FieldSelectProps } from "@/app/lib/types/form/fields";
import FormPattern from "../../patterns/form/FormPattern";
import DialogFormPattern from "../../patterns/dialog/DialogFormPattern";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultZoneFormState } from "@/app/lib/types/data/zones";
import { zoneAddFormAction } from "../zones/create/actions";

export interface PositionSelectFieldProps {
  fields: {
    zone?: FieldSelectProps<"Zone">;
    aisle?: FieldSelectProps<"Aisle">;
    rack?: FieldSelectProps<"Rack">;
    shelf?: FieldSelectProps<"Shelf">; 
  }

  // Add another field to either show or hide the 
  // create form
}

export default function PositionSelectField({
  fields,
}: PositionSelectFieldProps) {
  const [selectedZone, setSelectedZone] = useState(emptyZone);
  const [selectedAisle, setSelectedAisle] = useState(emptyAisle);
  const [selectedRack, setSelectedRack] = useState(emptyRack);
  const [selectedShelf, setSelectedShelf] = useState(emptyShelf);

  const [listZone, setListZone] = useState(fields.zone?.SelectField.list);
  const [listAisles, setListAisles] = useState(fields.aisle?.SelectField.list);
  const [listRacks, setListRacks] = useState(fields.rack?.SelectField.list);
  const [listShelfs, setListShelfs] = useState(fields.shelf?.SelectField.list);

  const [filteredAisles, setFilteredAisles] = useState(fields.aisle?.SelectField.list);
  const [filteredRacks, setFilteredRacks] = useState(fields.rack?.SelectField.list);
  const [filteredShelfs, setFilteredShelfs] = useState(fields.shelf?.SelectField.list);

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

            <DialogFormPattern<"Zone"> 
              self={{
                triggerType: "icon",
                dict: {
                  title: "Some dialog",
                  description: "PREMIMI TUTTO",
                  trigger: {label: "ANVEDI"},
                  clear: "NANDO"
                }
              }}
              formPattern={{
                type: "Zone",
                form: {
                  formName: "NOMEFORMTREQUADDTO",
                  initialState: defaultZoneFormState,
                  formAction: zoneAddFormAction,
                  refreshItemList: refreshZoneList,
                  // notifyFormSent
                  // refreshItemList
                },
                self: {
                  fields: {
                    ...fieldsDefaultProps,
                    name: {
                      dict: {
                        label: "sandrone",
                        placeholder: "daje",
                        validation: {
                          empty:"empty",
                          max:"max",
                          min:"min",
                          type:"type",
                          valid:"valid",
                        },
                      },
                      defaultValue: "sandroneDefaultValue",
                      errorMessages: [],
                    },
                    button: {
                      active: "attivo",
                      pending: "pendivo"
                    },
                  }
                } 
              }}
            />

            {
            //<ZoneAddDialog
            //  self={{
            //    triggerType: "icon",
            //    dict: fields.zone.AddDialog.self.dict
            //  }}
            //  propsZoneForm={{
            //    refreshItemList: refreshZoneList,
            //    dict: fields.zone.AddDialog.FormPattern.form.
            //  }}
            //   
            ///>
            }
          </div>
        )}
      </div>
    </div>
  )
}
