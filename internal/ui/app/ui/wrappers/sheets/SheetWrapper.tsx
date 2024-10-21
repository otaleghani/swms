"use client";

/** Local components */
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/app/ui/components/sheet"

interface SheetWrapperProps {
  Trigger: React.FunctionComponent;
  Body: React.FunctionComponent;
}

export default function SheetWrapper({
  Trigger,
  Body
}: SheetWrapperProps) {
  return (
    <Sheet>
      <Trigger />
      <SheetContent className="bg-gray-100 w-[100%] ">
        <Body />
      </SheetContent>
    </Sheet>
  )
}

