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

/** Actions */
import { FormPropsMap } from "@/app/lib/types/form/form";

/** Props */
export interface DialogFormPatternProps<T extends keyof FormPropsMap> {
  self: {
    triggerType: "button" | "icon";
    dict: DictDialog;
  }
  formPattern: FormPropsMap[T];
  showButton?: boolean;
}

export default function DialogFormPattern<T extends keyof FormPropsMap>({
  self,
  formPattern,
  showButton,
}: DialogFormPatternProps<T>) {
  const [open, setOpen] = useState(false);

  const DialogFormPatternBody = () => {
    return (
      <>
        <DialogWrapperHeader 
          title={self.dict.title}
          description={self.dict.description}
        />
        <FormPattern<T> 
          {...formPattern}
          form={{
            ...formPattern.form,
            notifyFormSent: setOpen,
          }}
          showButton={showButton}
        />
        <span>susenberg</span>
      </>
    )
  }

  const DialogFormPatternTrigger = () => {
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
        Body={DialogFormPatternBody}
        Trigger={DialogFormPatternTrigger}
        open={open}
        setOpen={setOpen}
        dict={self.dict}
      />
    </>
  )
}
