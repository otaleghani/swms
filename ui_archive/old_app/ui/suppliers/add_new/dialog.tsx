"use client";

import * as React from "react"

export interface AddNewSupplierDialogProps {
  dict_supplier_add_dialog: any;
  locale: string;
}

import { AddNewSupplierForm } from "./form";
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


export function AddNewSupplierDialog({ dict_supplier_add_dialog, locale }: AddNewSupplierDialogProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            {dict_supplier_add_dialog.dialog_button}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict_supplier_add_dialog.title}</DialogTitle>
            <DialogDescription>{dict_supplier_add_dialog.description}</DialogDescription>
          </DialogHeader>
          <AddNewSupplierForm 
            dict_supplier_add_dialog={dict_supplier_add_dialog} 
            locale={locale} 
            setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{dict_supplier_add_dialog.dialog_button}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict_supplier_add_dialog.title}</DrawerTitle>
          <DrawerDescription>{dict_supplier_add_dialog.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <AddNewSupplierForm 
            dict_supplier_add_dialog={dict_supplier_add_dialog} 
            locale={locale} 
            setOpen={setOpen} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{dict_supplier_add_dialog.clear_button}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
