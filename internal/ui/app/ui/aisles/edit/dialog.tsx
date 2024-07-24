"use client";

import { useActionState } from "react"
import { EditAisleState, EditAisleAction } from "@/app/ui/aisles/edit/action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";

interface EditAisleProps {
  dict: any;
  locale: string;
  aisle: any;
}

function EditAisleForm({ dict, locale, aisle }: EditAisleProps) {
  const initialState: EditAisleState = {
    error: false,
    errorMessages: { name: [], id: [], zone: [] },
    message: "",
  }
  const [state, action] = useActionState(EditAisleAction, initialState);

  return (
    <>
      <form action={action}>
        <Label>{dict.fields.name.label}</Label>
        <Input 
          name="name"
          defaultValue={aisle.name}
          placeholder={aisle.name}
        />
        <FormFieldError 
          id="quantity-error" 
          description={state.errorMessages.name} />
        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={aisle.id} name="id" />
        <Button type="submit" className="w-full mt-2">{dict.button}</Button>
        {state.error ? (
          <FormError 
            message={state.message!} />
        ) 
        : (
          <FormSuccess message={state.message!} />
        )}
      </form>
    </>
  )
}

import * as React from "react"
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"
import { Input } from "@/components/input";
import { Label } from "@/components/label";

export function EditAisle({ dict, locale, aisle }: EditAisleProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{dict.dialog_button}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict.title}</DialogTitle>
            <DialogDescription>{dict.description}</DialogDescription>
          </DialogHeader>
          <EditAisleForm dict={dict} locale={locale} aisle={aisle} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{dict.dialog_button}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict.title}</DrawerTitle>
          <DrawerDescription>{dict.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <EditAisleForm dict={dict} locale={locale} aisle={aisle} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{dict.clear_button}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
