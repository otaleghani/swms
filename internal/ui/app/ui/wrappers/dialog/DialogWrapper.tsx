"use client";

/** Third-party imports */
import { useMediaQuery } from "usehooks-ts";

/** Local components */
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/ui/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/app/ui/components/drawer"
import { Button } from "@/app/ui/components/button";

interface DialogWrapperProps {
  Trigger: React.FunctionComponent;
  Body: React.FunctionComponent;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dict: any;
}

/**
  * Wrapper function for the dialog component from shadcn/ui
  * */
export default function DialogWrapper({
  Trigger,
  Body,
  open,
  setOpen,
  dict,
}: DialogWrapperProps) {

  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Trigger />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Body />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Trigger />
      </DrawerTrigger>
      <DrawerContent>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">
              {dict.buttons.clear.active}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}