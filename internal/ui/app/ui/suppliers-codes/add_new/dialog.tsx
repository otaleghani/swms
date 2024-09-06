"use client";

import * as React from "react"
import { PlusIcon } from "lucide-react";
import { Supplier, Item, Variant } from "@/app/lib/types";

export interface AddNewSupplierCodeDialogProps {
  supplier: Supplier;
  variant: Variant;
  item: Item;
  dict_add_dialog: any;
  locale: string;
}

import { AddNewSupplierCodeForm } from "./form";
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

export function AddNewSupplierCodeDialog({ 
  dict_add_dialog, 
  locale,
  supplier,
  item,
  variant,
}: AddNewSupplierCodeDialogProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-8 h-8 p-0">
            <PlusIcon className="w-[1.2rem] h-[1.2rem]"/>
            {
            //dict_supplier_code_add_dialog.dialog_button
            }
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict_add_dialog.title}</DialogTitle>
            <DialogDescription>{dict_add_dialog.description}</DialogDescription>
          </DialogHeader>
          <AddNewSupplierCodeForm 
            dict_add_dialog={dict_add_dialog}
            locale={locale}
            supplier={supplier}
            item={item}
            variant={variant} 
            setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{dict_add_dialog.dialog_button}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict_add_dialog.title}</DrawerTitle>
          <DrawerDescription>{dict_add_dialog.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <AddNewSupplierCodeForm 
            dict_add_dialog={dict_add_dialog}
            locale={locale}
            supplier={supplier}
            item={item}
            variant={variant} 
            setOpen={setOpen} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{dict_add_dialog.clear_button}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
