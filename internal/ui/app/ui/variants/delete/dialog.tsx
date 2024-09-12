"use client";

import { SupplierCode, Variant } from "@/app/lib/types";
import { useEffect, useState } from "react";

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

export interface DeleteVariantDialogProps {
  dict: any;
  variant: Variant;
  setCodes: React.Dispatch<React.SetStateAction<SupplierCode[]>>;
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
}

export function DeleteCodeVariantDialog({
  dict, 
  variant,
  setCodes,
  setVariants,
}: DeleteVariantDialogProps) {

  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (deleteItem) {
      setCodes(prev => prev.filter(item => item.id !== variant.id));
      setVariants(prev => prev.filter(item => item.id !== variant.id));
      setDeleteItem(false);
    }
  }, [deleteItem])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="aspect-square p-0 w-8 h-8">
            <Trash2 className="w-[1.2rem] h-[1.2rem]"/>
          </Button>
       </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict.title}</DialogTitle>
            <DialogDescription>{dict.description}</DialogDescription>
          </DialogHeader>
          <Button type="button" onClick={() => setDeleteItem(true)}>{dict.button}</Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="aspect-square p-0 w-8 h-8">
          <Trash2 className="w-[1.2rem] h-[1.2rem]"/>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict.title}</DrawerTitle>
          <DrawerDescription>{dict.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <Button type="button" onClick={() => setDeleteItem(true)}>{dict.button_label}</Button>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{dict.button}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
