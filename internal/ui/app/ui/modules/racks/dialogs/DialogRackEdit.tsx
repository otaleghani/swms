"use client"

import { useState, useEffect } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Rack } from "@/app/lib/types/data/racks";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultRackFormState } from "@/app/lib/types/data/racks";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  rack: Rack;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
  },
  dict: DictDialog;
}

export default function DialogRackEdit({
  rack,
  fields,
  dict
}: Props) {
  const [currentZones, setCurrentZones] = useState(fields.zone.list);
  const [currentAisles, setCurrentAisles] = useState(fields.aisle.list);

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
  }, []);

  return (
    <>
      <DialogFormPattern<"Rack"> 
        showButton
        self={{
          triggerType: "iconEdit",
          dict: dict,
        }}
        formPattern={{
          type: "Rack",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              zone: {
                ...fields.zone,
                list: currentZones,
              },
              aisle: {
                ...fields.aisle,
                list: currentAisles,
              },
              button: fields.button
            },
          },
          form: {
            formName: "updateRack" + rack.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultRackFormState,
              result: {
                id: rack.id as string,
                zone: rack.zone as string,
                aisle: rack.aisle as string,
                name: rack.name as string,
              }
            }
          }
        }}
      />
    </>
  )
}
