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
import { defaultAisleFormState } from "@/app/lib/types/data/aisles";
import { Dispatch, SetStateAction, useMemo } from "react";

interface Props {
  dict: DictDialog;
  fields: {
    name: InputFieldProps;
    zone: SelectFieldProps<"Zone">;
    button: DictFormButton;
  },
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

export default function DialogAisleCreate({
  fields,
  dict,
  open,
  setOpen
}: Props) {

  return (
    <>
      <DialogFormPattern<"Aisle"> 
        open={open}
        setOpen={setOpen}
        showButton
        self={{
          triggerType: "iconAdd",
          dict: dict,
        }}
        formPattern={{
          type: "Aisle",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              zone: fields.zone,
              button: fields.button,
            },
          },
          form: {
            formName: "NewAddAisleSus",
            formAction: createFormAction,
            initialState: defaultAisleFormState,
          }
        }}
      />
    </>
  )
}
