"use client";

/** React hooks */
import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";

/** Third party components */
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";

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
    triggerType: "button" | "iconEdit" | "iconAdd" | "iconDelete";
    dict: DictDialog;
  }
  formPattern: FormPropsMap[T];
  showButton?: boolean;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  xSmall?: boolean;
}

export default function DialogFormPattern<T extends keyof FormPropsMap>({
  self,
  formPattern,
  showButton,
  open,
  setOpen,
  xSmall,
}: DialogFormPatternProps<T>) {

  const DialogFormPatternBody = () => {
    return (
      <div className="p-4 md:p-0">
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
      </div>
    )
  }

  const DialogFormPatternTrigger = () => {
    if (self.triggerType === "button") {
      return (
        <>
          <DialogTrigger asChild>
            <Button
              //type="submit"
              //form={formPattern.form.formName}
              size="sm"
            >{self.dict.trigger.label}</Button>
          </DialogTrigger>
        </>
      )
    }
    if (self.triggerType === "iconAdd") {
      return (
        <>
          <DialogTrigger asChild>
            <Button 
              size="sm"
              variant="outline"
              className={xSmall ? 
                "aspect-square p-0 h-8 w-8" : 
                "aspect-square p-0 h-10 w-10"}
            >
            <PlusIcon 
              className={xSmall ? "w-3.5 h-3.5" : "w-4 h-4"}
            /></Button>
          </DialogTrigger>
        </>
      )
    }
    if (self.triggerType === "iconEdit") {
      return (
        <>
          <DialogTrigger asChild>
            <Button 
              size="sm"
              variant="outline"
              className={xSmall ? 
                "aspect-square p-0 h-8 w-8" : 
                "aspect-square p-0 h-10 w-10"}
            >
            <EditIcon 
              className={xSmall ? "w-3.5 h-3.5" : "w-4 h-4"}
            /></Button>
          </DialogTrigger>
        </>
      )
    }
    if (self.triggerType === "iconDelete") {
      return (
        <>
          <DialogTrigger asChild>
            <Button 
              size="sm"
              variant="outline"
              className={xSmall ? 
                "aspect-square p-0 h-8 w-8" : 
                "aspect-square p-0 h-10 w-10"}
            ><TrashIcon 
              className={xSmall ? "w-3.5 h-3.5" : "w-4 h-4"}
            /></Button>
          </DialogTrigger>
        </>
      )
    }
  }

  return (
    <>
      <DialogWrapper 
        Body={DialogFormPatternBody}
        Trigger={DialogFormPatternTrigger}
        open={open as boolean}
        setOpen={setOpen as Dispatch<SetStateAction<boolean>>}
        dict={self.dict}
      />
    </>
  )
}
