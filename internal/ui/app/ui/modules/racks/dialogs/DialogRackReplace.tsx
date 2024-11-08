"use client"

import { useState, useEffect } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Rack } from "@/app/lib/types/data/racks";

// Default values
import { fieldsDefaultProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  rack: Rack;
  dict: DictDialog;
  fields: {
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
    button: DictFormButton;
  }
}

export default function DialogRackReplace({
  rack,
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
      <DialogFormPattern<"Replace">
        showButton
        self={{
          triggerType: "iconDelete",
          dict: dict,
        }}
        formPattern={{
          type: "Replace",
          self: {
            fields: {
              ...fieldsDefaultProps,
              id: rack.id as string,
              zone: { ...fields.zone, list: currentZones },
              aisle: { ...fields.aisle, list: currentAisles },
              rack: { ...fields.rack, list: currentRacks },
              button: fields.button },
          },
          form: {
            formName: "replaceRack" + rack.id as string,
            formAction: replaceFormAction,
            initialState: {
              ...defaultReplaceFormState,
              result: {
                itemToDelete: rack.id ? rack.id : "",
                itemThatReplaces: "",
                type: "Rack",
              },
            },
          },
        }}
      />
    </>
  )
}
