"use client";

/** React hooks */
import { useState } from "react";

/** Third party components */
import { PlusIcon } from "lucide-react";

/** Local components */
import DialogWrapper from "@/app/ui/wrappers/dialogs/DialogWrapper"
import DialogWrapperHeader from "@/app/ui/wrappers/dialogs/DialogWrapperHeader"
import { Button } from "@/app/ui/components/button"
import { DialogTrigger } from "@/app/ui/components/dialog";
import FormPattern from "@/app/ui/patterns/form/FormPattern";

/** Types and interfaces */
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { Zone } from "@/app/lib/types/data/zones";

/** Actions */
import { zoneAddFormAction } from "./actions";
import { defaultZoneFormState } from "@/app/lib/types/data/zones";
import { FormFieldsPropsWithDictMap } from "@/app/lib/types/form/fields";
import { FormPropsMap } from "@/app/lib/types/form/form";

/** Props */
export interface ZoneCreateDialogProps {
  self: {
    triggerType: "button" | "icon";
    dict: DictDialog;
  }
  formPattern: FormPropsMap["Zone"];
}

export default function ZoneAddDialog({
  self,
  formPattern
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
        <FormPattern<"Zone"> 
          form={{
            ...formPattern.form,
            formName: formName,
          }}
          self={formPattern.self}
          type={formPattern.type}
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
