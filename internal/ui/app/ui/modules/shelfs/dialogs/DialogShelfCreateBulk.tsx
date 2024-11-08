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
import { defaultShelfsBulkFormState } from "@/app/lib/types/data/shelfs";

interface Props {
  dict: DictDialog;
  fields: {
    quantity: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
  }
  relatedZone?: string;
  relatedAisle?: string;
  relatedRack?: string;
}

export default function DialogShelfCreateBulk({
  fields,
  dict,
  relatedZone,
  relatedAisle,
  relatedRack,
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
      <DialogFormPattern<"ShelfsBulk"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "ShelfsBulk",
          self: {
            fields: {
              ...fieldsDefaultProps,
              zone: { ...fields.zone, list: currentZones },
              aisle: { ...fields.aisle, list: currentAisles },
              rack: { ...fields.rack, list: currentRacks },
              quantity: fields.quantity,
              button: fields.button,
            },
          },
          form: {
            formName: "ShelfAddBulk",
            formAction: createFormAction,
            initialState: {
              ...defaultShelfsBulkFormState,
              result: {
                quantity: 0,
                zone: relatedZone ? relatedZone : "",
                aisle: relatedAisle ? relatedAisle : "",
                rack: relatedRack ? relatedRack : "",
              }
            }
          }
        }}
      />
    </>
  )
}
