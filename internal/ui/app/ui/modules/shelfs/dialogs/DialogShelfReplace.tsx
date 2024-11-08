"use client"

import { useState, useEffect } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Shelf } from "@/app/lib/types/data/shelfs";

// Default values
import { fieldsDefaultProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  shelf: Shelf;
  dict: DictDialog;
  fields: {
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
    shelf: SelectFieldProps<"Shelf">;
    button: DictFormButton;
  }
}

export default function DialogShelfReplace({
  shelf,
  fields,
  dict
}: Props) {
  const [currentZones, setCurrentZones] = useState(fields.zone.list);
  const [currentAisles, setCurrentAisles] = useState(fields.aisle.list);
  const [currentRacks, setCurrentRacks] = useState(fields.rack.list);
  const [currentShelfs, setCurrentShelfs] = useState(fields.shelf.list);

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
    synchronizeList<"Shelf">({
      streamer: streamer as Worker,
      list: currentShelfs,
      setList: setCurrentShelfs,
      type: "Shelf",
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
              id: shelf.id as string,
              zone: { ...fields.zone, list: currentZones },
              aisle: { ...fields.aisle, list: currentAisles },
              rack: { ...fields.rack, list: currentRacks },
              shelf: { ...fields.shelf, list: currentShelfs },
              button: fields.button
            },
          },
          form: {
            formName: "replaceShelf" + shelf.id as string,
            formAction: replaceFormAction,
            initialState: {
              ...defaultReplaceFormState,
              result: {
                itemToDelete: shelf.id ? shelf.id : "",
                itemThatReplaces: "",
                type: "Shelf",
              },
            },
          },
        }}
      />
    </>
  )
}
