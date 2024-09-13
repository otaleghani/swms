"use client"

import { Button } from "@/components/button"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
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
import { Category, Subcategory } from "@/app/lib/types"
import AddSubcategoryForm from "./form"

export interface AddSubcategoryDialogProps {
  handleAddSubcategory: (item: Subcategory) => Promise<void>;
  locale: string;
  dict_add_dialog: any;
  category: Category;
}

export default function DialogAddSubcategory({ 
  handleAddSubcategory, 
  locale, 
  dict_add_dialog, 
  category 
}: AddSubcategoryDialogProps) {
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
            <AddSubcategoryForm
              handleAddSubcategory={handleAddSubcategory}
              locale={locale}
              dict_add_dialog={dict_add_dialog}
              setOpen={setOpen}
              category={category} />
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
          <AddSubcategoryForm
            handleAddSubcategory={handleAddSubcategory}
            locale={locale}
            dict_add_dialog={dict_add_dialog}
            setOpen={setOpen}
            category={category} />
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
