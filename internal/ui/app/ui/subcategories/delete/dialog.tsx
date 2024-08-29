"use client";

import { Subcategory } from "@/app/lib/types";
import DeleteSubcategoryForm from "./form";

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

export interface DeleteSubcategoryDialogProps {
  dict: any;
  locale: string;
  item: Subcategory;
  subcategories: Subcategory[];
  dict_subcategory_select: any;
}

export function DeleteSubcategoryDialog({
  dict, 
  locale, 
  item, 
  subcategories, 
  dict_subcategory_select }: DeleteSubcategoryDialogProps) {

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
          <DeleteSubcategoryForm
            dict={dict}
            locale={locale}
            item={item}
            subcategories={subcategories}
            dict_subcategory_select={dict_subcategory_select}
            setOpen={setOpen} />
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
          <DeleteSubcategoryForm
            dict={dict}
            locale={locale}
            item={item}
            subcategories={subcategories}
            dict_subcategory_select={dict_subcategory_select}
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
}
