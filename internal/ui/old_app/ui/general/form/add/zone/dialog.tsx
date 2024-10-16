import AddZoneDialogForm from "./form";

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

export interface AddZoneDialogProps {
  handleAddZone: (item: any) => Promise<void>;
  dict_zone_add_dialog: any;
  lang: string;
}

export default function AddZoneDialog({
  handleAddZone,
  dict_zone_add_dialog,
  lang }: AddZoneDialogProps) {

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
            <DialogTitle>{dict_zone_add_dialog.title}</DialogTitle>
            <DialogDescription>{dict_zone_add_dialog.description}</DialogDescription>
          </DialogHeader>
          <AddZoneDialogForm 
            handleAddZone={handleAddZone}
            lang={lang}
            dict_zone_add_dialog={dict_zone_add_dialog}
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
          <DrawerTitle>{dict_zone_add_dialog.title}</DrawerTitle>
          <DrawerDescription>{dict_zone_add_dialog.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <AddZoneDialogForm 
            handleAddZone={handleAddZone}
            lang={lang}
            dict_zone_add_dialog={dict_zone_add_dialog}
            setOpen={setOpen}
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
