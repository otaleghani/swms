"use client";

import { useActionState, useState, useEffect } from "react"
import { AddBulkZonesState, AddBulkZonesAction } from "./action";
import { Minus, PlusIcon } from "lucide-react";
import { GeistSans } from "geist/font/sans";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { useRouter } from "next/router";

interface AddBulkZonesProps {
  dict: any,
  locale: string,
}

function AddBulkZonesForm({ dict, locale }: AddBulkZonesProps) {
  const initialState: AddBulkZonesState = {
    error: false,
    errorMessages: { quantity: [] },
    message: "",
  }
  const [state, action] = useActionState(AddBulkZonesAction, initialState);

  const subOne = (() => {
    const input = document.getElementById('quantity') as HTMLInputElement;
    if (Number(input.value) > 0) {
      input.value = String(Number(input.value) - 1)
    }
  });

  const addOne = (() => {
    const input = document.getElementById('quantity') as HTMLInputElement;
    input.value = String(Number(input.value) + 1)
  });

  useEffect(() => {
    const input = document.getElementById('quantity') as HTMLInputElement;
    if (Number(input.value) < 0) {
      input.value = String(Number(0))
    }
  }, [document.getElementById('quantity')])

  return (
    <>
      <form action={action}>
        <div className="flex items-center">
          <Button className="flex rounded-full w-12 h-12" variant="secondary" onClick={subOne} type="button"><Minus className="w-4 h-4"/></Button>
          <input 
            id="quantity"
            key="quantity"
            name="quantity"
            type="number"
            placeholder="0"
            min="0"
            inputMode="numeric" 
            onFocus={(e) => e.target.select()}
            className={`${GeistSans.className} font-bold text-8xl block text-foreground w-full text-center leading-none tracking-tighter`}
          />
          <Button className="flex rounded-full w-12 h-12" variant="secondary" onClick={addOne} type="button"><PlusIcon className="w-4 h-4"/></Button>
        </div>
        <FormFieldError 
          id="quantity-error" 
          description={state.errorMessages.quantity} />
        <input type="hidden" value={locale} name="locale" />
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
import { Input } from "@/components/input"
import { Label } from "@/components/label"


export function AddBulkZones({ dict, locale }: AddBulkZonesProps) {
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
          <AddBulkZonesForm dict={dict} locale={locale} />
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
          <AddBulkZonesForm dict={dict} locale={locale} />
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
