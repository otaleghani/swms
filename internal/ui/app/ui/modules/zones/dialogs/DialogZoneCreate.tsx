"use client"

// Actions
import { createFormAction } from "@/app/lib/actions/create/createFormAction";

// Components
import DialogFormPattern, { DialogFormPatternProps } from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps } from "@/app/lib/types/form/fields";

// Default values
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultZoneFormState } from "@/app/lib/types/data/zones";
import { Dispatch, SetStateAction, useMemo } from "react";

interface Props {
  dict: DictDialog;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
  },
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

export default function DialogZoneCreate({
  fields,
  dict,
  open,
  setOpen
}: Props) {

  return (
    <>
      <DialogFormPattern<"Zone"> 
        open={open}
        setOpen={setOpen}
        showButton
        self={{
          triggerType: "iconAdd",
          dict: dict,
        }}
        formPattern={{
          type: "Zone",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              button: fields.button,
            },
          },
          form: {
            formName: "NewAddZoneSus",
            formAction: createFormAction,
            initialState: defaultZoneFormState,
          }
        }}
      />
    </>
  )
}
