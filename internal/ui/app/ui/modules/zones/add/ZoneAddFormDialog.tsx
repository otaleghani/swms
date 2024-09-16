"use client";

/** React hooks */
import { useState } from "react";

/** Local components */
import DialogWrapper from "@/app/ui/wrappers/dialogs/DialogWrapper"
import DialogWrapperHeader from "@/app/ui/wrappers/dialogs/DialogWrapperHeader"
import ZoneAddForm from "./form/ZoneAddForm";
import { Button } from "@/app/ui/components/button"
import { DialogTrigger } from "@/app/ui/components/dialog";


interface ZoneAddDialog {
  locale: string;
  dict: any;
}

export default function ZoneAddFormDialog({
  locale,
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
        <ZoneAddForm 
          locale={locale}
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
