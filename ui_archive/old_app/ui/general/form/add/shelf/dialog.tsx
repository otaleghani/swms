import AddShelfDialogForm from "./form";
import { Zone, Aisle, Rack } from "@/app/lib/types";

import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";

import { Button } from "@/components/button";
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
import { PlusCircleIcon } from "lucide-react";

export interface AddShelfDialogProps {
  handleAddShelf: (item: any) => Promise<void>;
  dict_shelf_add_dialog: any;
  lang: string;
  zone: Zone;
  aisle: Aisle;
  rack: Rack;
}

export default function AddShelfDialog({
  handleAddShelf,
  dict_shelf_add_dialog,
  lang,
  zone,
  aisle,
  rack }: AddShelfDialogProps) {

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
            <DialogTitle>{dict_shelf_add_dialog.title}</DialogTitle>
            <DialogDescription>{dict_shelf_add_dialog.description}</DialogDescription>
          </DialogHeader>
          <AddShelfDialogForm 
            handleAddShelf={handleAddShelf}
            lang={lang}
            dict_shelf_add_dialog={dict_shelf_add_dialog}
            setOpen={setOpen}
            zone={zone}
            aisle={aisle}
            rack={rack}
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
          <DrawerTitle>{dict_shelf_add_dialog.title}</DrawerTitle>
          <DrawerDescription>{dict_shelf_add_dialog.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <AddShelfDialogForm 
            handleAddShelf={handleAddShelf}
            lang={lang}
            dict_shelf_add_dialog={dict_shelf_add_dialog}
            setOpen={setOpen}
            zone={zone}
            aisle={aisle}
            rack={rack}
          />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
