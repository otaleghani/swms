import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../../components/drawer"
import { Button } from "../../components/button";

interface DialogWrapperProps {
  Trigger: React.FunctionComponent;
  Body: React.FunctionComponent;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dict: any;
}

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
