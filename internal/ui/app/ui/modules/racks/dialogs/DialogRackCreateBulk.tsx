"use client"

import { useState, useEffect } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

// Actions
import { createFormAction } from "@/app/lib/actions/create/createFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";

// Default values
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultRacksBulkFormState } from "@/app/lib/types/data/racks";

interface Props {
  dict: DictDialog;
  fields: {
    quantity: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
  }
  relatedZone?: string;
  relatedAisle?: string;
}

export default function DialogRackCreateBulk({
  fields,
  dict,
  relatedZone,
  relatedAisle,
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
      <DialogFormPattern<"RacksBulk"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "RacksBulk",
          self: {
            fields: {
              ...fieldsDefaultProps,
              zone: {
                ...fields.zone,
                list: currentZones,
              },
              aisle: {
                ...fields.aisle,
                list: currentAisles,
              },
              quantity: fields.quantity,
              button: fields.button,
            },
          },
          form: {
            formName: "RackAddBulk",
            formAction: createFormAction,
            initialState: {
              ...defaultRacksBulkFormState,
              result: {
                quantity: 0,
                zone: relatedZone ? relatedZone : "",
                aisle: relatedAisle ? relatedAisle : "",
              }
            }
          }
        }}
      />
    </>
  )
}
