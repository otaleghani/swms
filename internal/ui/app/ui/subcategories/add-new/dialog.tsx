"use client";

import * as React from "react"
import { Category } from "@/app/lib/types";

export interface AddNewSubcategoryDialogProps {
  category: Category;
  dict_subcategory_add_dialog: any;
  locale: string;
}

import { AddNewSubcategoryForm } from "./form";
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

export function AddNewSubcategoryDialog({ 
  category,
  dict_subcategory_add_dialog, 
  locale 
}: AddNewSubcategoryDialogProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            {dict_subcategory_add_dialog.dialog_button}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict_subcategory_add_dialog.title}</DialogTitle>
            <DialogDescription>{dict_subcategory_add_dialog.description}</DialogDescription>
          </DialogHeader>
          <AddNewSubcategoryForm 
            category={category}
            dict_subcategory_add_dialog={dict_subcategory_add_dialog} 
            locale={locale} 
            setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{dict_subcategory_add_dialog.dialog_button}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict_subcategory_add_dialog.title}</DrawerTitle>
          <DrawerDescription>{dict_subcategory_add_dialog.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <AddNewSubcategoryForm 
            category={category}
            dict_subcategory_add_dialog={dict_subcategory_add_dialog} 
            locale={locale} 
            setOpen={setOpen} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{dict_subcategory_add_dialog.clear_button}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
