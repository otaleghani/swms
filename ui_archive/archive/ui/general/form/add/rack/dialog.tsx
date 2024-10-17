import AddRackDialogForm from "./form";
import { Zone, Aisle } from "@/app/lib/types";

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

export interface AddRackDialogProps {
  handleAddRack: (item: any) => Promise<void>;
  dict_rack_add_dialog: any;
  lang: string;
  zone: Zone;
  aisle: Aisle;
}

export default function AddRackDialog({
  handleAddRack,
  dict_rack_add_dialog,
  lang,
  zone,
  aisle }: AddRackDialogProps) {

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
            <DialogTitle>{dict_rack_add_dialog.title}</DialogTitle>
            <DialogDescription>{dict_rack_add_dialog.description}</DialogDescription>
          </DialogHeader>
          <AddRackDialogForm 
            handleAddRack={handleAddRack}
            lang={lang}
            dict_rack_add_dialog={dict_rack_add_dialog}
            setOpen={setOpen}
            zone={zone}
            aisle={aisle}
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
          <DrawerTitle>{dict_rack_add_dialog.title}</DrawerTitle>
          <DrawerDescription>{dict_rack_add_dialog.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <AddRackDialogForm 
            handleAddRack={handleAddRack}
            lang={lang}
            dict_rack_add_dialog={dict_rack_add_dialog}
            setOpen={setOpen}
            zone={zone}
            aisle={aisle}
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
