"use client";

import { PencilIcon } from "lucide-react";
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
import { SupplierCode } from "@/app/lib/types";
import { EditSupplierCodeVariantForm } from "./form";

export interface EditSupplierCodeDialogProps {
  dict: any;
  locale: string;
  supplierCode: SupplierCode;
  setCodes: React.Dispatch<React.SetStateAction<SupplierCode[]>>;
}

export function EditSupplierCodeVariantDialog({ 
  dict, 
  locale, 
  supplierCode, 
  setCodes, 
}: EditSupplierCodeDialogProps ) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="p-0 w-8 h-8">
            <PencilIcon className="w-[1.2rem] h-[1.2rem]"/>
          </Button>
       </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict.title}</DialogTitle>
            <DialogDescription>{dict.description}</DialogDescription>
          </DialogHeader>
          <EditSupplierCodeVariantForm 
            dict={dict}
            locale={locale}
            supplierCode={supplierCode}
            setOpen={setOpen} 
            setCodes={setCodes} 
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="p-0 w-8 h-8">
          <PencilIcon className="w-[1.2rem] h-[1.2rem]"/>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict.title}</DrawerTitle>
          <DrawerDescription>{dict.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <EditSupplierCodeVariantForm 
            dict={dict}
            locale={locale}
            supplierCode={supplierCode}
            setOpen={setOpen} 
            setCodes={setCodes}
          />
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
