"use client";

import { Supplier } from "@/app/lib/types";
import DeleteSupplierForm from "./form";

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
import { Trash2 } from "lucide-react";

export interface DeleteSupplierDialogProps {
  dict: any;
  locale: string;
  item: Supplier;
  suppliers: Supplier[];
  dict_supplier_select: any;
}

export function DeleteSupplierDialog({
  dict, 
  locale, 
  item, 
  suppliers, 
  dict_supplier_select 
}: DeleteSupplierDialogProps) {

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="aspect-square p-0">
            <Trash2 className="w-[1.2rem] h-[1.2rem]" />
          </Button>
       </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict.title}</DialogTitle>
            <DialogDescription>{dict.description}</DialogDescription>
          </DialogHeader>
          <DeleteSupplierForm 
            setOpen={setOpen}
            dict={dict} 
            locale={locale} 
            item={item}
            suppliers={suppliers}
            dict_supplier_select={dict_supplier_select} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="aspect-square p-0">
          <Trash2 className="w-[1.2rem] h-[1.2rem]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict.title}</DrawerTitle>
          <DrawerDescription>{dict.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <DeleteSupplierForm 
            dict={dict} 
            locale={locale} 
            item={item}
            suppliers={suppliers}
            dict_supplier_select={dict_supplier_select}
            setOpen={setOpen} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{dict.clear_button}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )

