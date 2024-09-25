"use client";

/** React hooks */
import { useState } from "react";

/** Third party components */
import { PlusIcon } from "lucide-react";

/** Local components */
import DialogWrapper from "@/app/ui/wrappers/dialogs/DialogWrapper"
import DialogWrapperHeader from "@/app/ui/wrappers/dialogs/DialogWrapperHeader"
import ZoneForm, { DictZoneForm } from "../misc/ZoneForm";
import { Button } from "@/app/ui/components/button"
import { DialogTrigger } from "@/app/ui/components/dialog";

/** Types and interfaces */
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { Zone } from "@/app/lib/types/data/zones";

/** Actions */
import { zoneAddFormAction } from "./actions";
import { defaultZoneFormState } from "@/app/lib/types/data/zones";

/** Props */
export interface ZoneCreateDialogProps {
  self: {
    triggerType: "button" | "icon";
    dict: DictDialog;
  }
  propsZoneForm: {
    dict: DictZoneForm;
    refreshItemList?: (item: Zone) => void;
  }
}

export default function ZoneAddDialog({
  self,
  propsZoneForm
}: ZoneCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const formName = "AddZoneDialog";

  const ZoneAddFormDialogBody = () => {
    return (
      <>
        <DialogWrapperHeader 
          title={self.dict.title}
          description={self.dict.description}
        />
        <ZoneForm 
          self={{
            form: {
              formName: formName,
              initialState: defaultZoneFormState,
              formAction: zoneAddFormAction,
              notifyFormSent: setOpen,
              refreshItemList: propsZoneForm.refreshItemList,
            },
            dict: propsZoneForm.dict,
          }}
        />
      </>
    )
  }

  const ZoneAddFormDialogTrigger = () => {
    return (
      <>
        {self.triggerType === "button" 
          ? ( 
            <DialogTrigger asChild>
              <Button>{self.dict.trigger.label}</Button>
            </DialogTrigger>
          ) : ( 
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                className="aspect-square p-0"
              ><PlusIcon className="w-4 h-4"/></Button>
            </DialogTrigger>
          )
        }
      </>
    )
  }

  return (
    <>
      <DialogWrapper 
        Body={ZoneAddFormDialogBody}
        Trigger={ZoneAddFormDialogTrigger}
        open={open}
        setOpen={setOpen}
        dict={self.dict}
      />
    </>
  )
}
