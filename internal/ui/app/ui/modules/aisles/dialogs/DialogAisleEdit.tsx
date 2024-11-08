"use client"

import { useState, useEffect } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Aisle } from "@/app/lib/types/data/aisles";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultAisleFormState } from "@/app/lib/types/data/aisles";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  aisle: Aisle;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
  },
  dict: DictDialog;
}

export default function DialogAisleEdit({
  aisle,
  fields,
  dict
}: Props) {
  const [currentList, setCurrentList] = useState(fields.zone.list);

  useEffect(() => {
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: currentList,
      setList: setCurrentList,
      type: "Zone",
    });
  }, [])

  return (
    <>
      <DialogFormPattern<"Aisle"> 
        showButton
        self={{
          triggerType: "iconEdit",
          dict: dict,
        }}
        formPattern={{
          type: "Aisle",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              zone: {
                ...fields.zone,
                list: currentList,
              },
              button: fields.button
            },
          },
          form: {
            formName: "updateAisle" + aisle.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultAisleFormState,
              result: {
                id: aisle.id as string,
                zone: aisle.zone as string,
                name: aisle.name as string,
              }
            }
          }
        }}
      />
    </>
  )
}
