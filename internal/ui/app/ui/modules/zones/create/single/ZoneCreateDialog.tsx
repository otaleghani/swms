"use client";

/** React hooks */
import { useState } from "react";

/** Local components */
import DialogWrapper from "@/app/ui/wrappers/dialogs/DialogWrapper"
import DialogWrapperHeader from "@/app/ui/wrappers/dialogs/DialogWrapperHeader"
import ZoneCreateForm, { DictZoneForm } from "../../misc/form/ZoneForm";
import { Button } from "@/app/ui/components/button"
import { DialogTrigger } from "@/app/ui/components/dialog";

/** Types and interfaces */
import { 
  ZoneFormState, 
  defaultZoneFormState 
} from "@/app/lib/types/data/zones";


interface DialogWrapperHeaderDict {
  title: string;
  description: string;
}

interface ZoneAddDialogDict {
  header: DialogWrapperHeaderDict;
  form: DictZoneForm;
  trigger: any;
}

export default function ZoneAddDialog({
  dict,
}: ZoneAddDialog) {
  const [open, setOpen] = useState(false);

  const ZoneAddFormDialogBody = () => {
    return (
      <>
        <DialogWrapperHeader 
          title="suckit"
          description="asdf"
        />
        <ZoneCreateForm 
          dict={dict}
        />
      </>
    )
  }

  const ZoneAddFormDialogTrigger = () => {
    return (
      <>
        <DialogTrigger asChild>
          <Button>Helo</Button>
        </DialogTrigger>
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
        dict={dict}
      />
    </>
  )
}
