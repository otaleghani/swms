"use client"

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
import { defaultShelfFormState } from "@/app/lib/types/data/shelfs";
import { Dispatch, SetStateAction, useMemo } from "react";

interface Props {
  dict: DictDialog;
  fields: {
    name: InputFieldProps;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
    button: DictFormButton;
  },
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

export default function DialogShelfCreate({
  fields,
  dict,
  open,
  setOpen
}: Props) {

  return (
    <>
      <DialogFormPattern<"Shelf"> 
        open={open}
        setOpen={setOpen}
        showButton
        self={{
          triggerType: "iconAdd",
          dict: dict,
        }}
        formPattern={{
          type: "Shelf",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              zone: fields.zone,
              aisle: fields.aisle,
              rack: fields.rack,
              button: fields.button,
            },
          },
          form: {
            formName: "NewAddShelfSus",
            formAction: createFormAction,
            initialState: defaultShelfFormState,
          }
        }}
      />
    </>
  )
}
