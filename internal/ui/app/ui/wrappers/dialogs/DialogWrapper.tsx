"use client";

/** Third-party imports */
import { useMediaQuery } from "usehooks-ts";

/** Local components */
import {
  Dialog,
  DialogContent,
} from "@/app/ui/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/app/ui/components/drawer"
import { Button } from "@/app/ui/components/button";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

interface DialogWrapperProps {
  Trigger: React.FunctionComponent;
  Body: React.FunctionComponent;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dict: DictDialog;
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
        <Trigger />
        <DialogContent className="sm:max-w-[425px]">
          <Body />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Trigger />
      <DrawerContent>
        <Body />
        <DrawerFooter className="-mt-9">
          <DrawerClose asChild>
            <Button variant="outline">{dict.clear}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
