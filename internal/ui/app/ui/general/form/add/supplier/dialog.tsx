"use client"

import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"

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
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerContent
} from "@/components/drawer"
import { PlusCircleIcon } from "lucide-react"
import { Supplier } from "@/app/lib/types"
import AddSupplierForm from "./form"

export interface AddSupplierDialogProps {
  handleAddSupplier: (item: Supplier) => Promise<void>;
  locale: string;
  dict_add_dialog: any;
  dict_form_fields: any;
}

export default function DialogAddSupplier({ 
  handleAddSupplier,
  locale, 
  dict_add_dialog,
  dict_form_fields,
}: AddSupplierDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="ml-2 p-0 aspect-square">
            <PlusCircleIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict_add_dialog.title}</DialogTitle>
            <DialogDescription>{dict_add_dialog.description}</DialogDescription>
          </DialogHeader>
            <AddSupplierForm 
              handleAddSupplier={handleAddSupplier}
              locale={locale}
              dict_add_dialog={dict_add_dialog}
              dict_form_fields={dict_form_fields}
              setOpen={setOpen} 
            />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="ml-2 p-0 aspect-square">
          <PlusCircleIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict_add_dialog.title}</DrawerTitle>
          <DrawerDescription>{dict_add_dialog.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
            <AddSupplierForm 
              handleAddSupplier={handleAddSupplier}
              locale={locale}
              dict_add_dialog={dict_add_dialog}
              dict_form_fields={dict_form_fields}
              setOpen={setOpen} 
            />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{dict_add_dialog.cancel_button}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

