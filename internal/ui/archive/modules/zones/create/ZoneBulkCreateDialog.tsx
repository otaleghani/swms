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
import { defaultZoneBulkFormState, Zone } from "@/app/lib/types/data/zones";

/** Actions */
import { zoneAddBulkFormAction, zoneAddFormAction } from "./actions";
import { defaultZoneFormState } from "@/app/lib/types/data/zones";
import ZoneBulkCreateForm, { DictBulkZoneForm } from "../misc/ZoneBulkCreateForm";

/** Props */
export interface ZoneBulkCreateDialogProps {
  self: {
    triggerType: "button" | "icon";
    dict: DictDialog;
  }
  propsZoneBulkForm: {
    dict: DictBulkZoneForm;
    //refreshItemList?: (item: Zone) => void;
  }
}

export default function ZoneAddDialog({
  self,
  propsZoneBulkForm
}: ZoneBulkCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const formName = "AddBulkZoneDialog";

  const ZoneBulkCreateFormDialogBody = () => {
    return (
      <>
        <DialogWrapperHeader 
          title={self.dict.title}
          description={self.dict.description}
        />
        <ZoneBulkCreateForm 
          self={{
            form: {
              formName: formName,
              initialState: defaultZoneBulkFormState,
              formAction: zoneAddBulkFormAction,
              notifyFormSent: setOpen,
              //refreshItemList: propsZoneBulkForm.refreshItemList,
            },
            dict: propsZoneBulkForm.dict,
          }}
        />
      </>
    )
  }

  const ZoneBulkCreateFormDialogTrigger = () => {
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
        Body={ZoneBulkCreateFormDialogBody}
        Trigger={ZoneBulkCreateFormDialogTrigger}
        open={open}
        setOpen={setOpen}
        dict={self.dict}
      />
    </>
  )
}
