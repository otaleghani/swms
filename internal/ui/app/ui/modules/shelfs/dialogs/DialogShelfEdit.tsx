"use client"

import { useState, useEffect } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Shelf } from "@/app/lib/types/data/shelfs";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultShelfFormState } from "@/app/lib/types/data/shelfs";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  shelf: Shelf;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
  },
  dict: DictDialog;
}

export default function DialogShelfEdit({
  shelf,
  fields,
  dict
}: Props) {
  const [currentZones, setCurrentZones] = useState(fields.zone.list);
  const [currentAisles, setCurrentAisles] = useState(fields.aisle.list);
  const [currentRacks, setCurrentRacks] = useState(fields.rack.list);

  useEffect(() => {
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: currentZones,
      setList: setCurrentZones,
      type: "Zone",
    });
    synchronizeList<"Aisle">({
      streamer: streamer as Worker,
      list: currentAisles,
      setList: setCurrentAisles,
      type: "Aisle",
    });
    synchronizeList<"Rack">({
      streamer: streamer as Worker,
      list: currentRacks,
      setList: setCurrentRacks,
      type: "Rack",
    });
  }, []);

  return (
    <>
      <DialogFormPattern<"Shelf"> 
        showButton
        self={{
          triggerType: "iconEdit",
          dict: dict,
        }}
        formPattern={{
          type: "Shelf",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              zone: { ...fields.zone, list: currentZones },
              aisle: { ...fields.aisle, list: currentAisles },
              rack: { ...fields.rack, list: currentRacks },
              button: fields.button
            },
          },
          form: {
            formName: "updateShelf" + shelf.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultShelfFormState,
              result: {
                id: shelf.id as string,
                zone: shelf.zone as string,
                aisle: shelf.aisle as string,
                rack: shelf.rack as string,
                name: shelf.name as string,
              }
            }
          }
        }}
      />
    </>
  )
}
