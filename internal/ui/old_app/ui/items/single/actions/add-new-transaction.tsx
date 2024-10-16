'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "usehooks-ts"
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
import { Minus, PlusIcon } from "lucide-react"
import { GeistSans } from "geist/font/sans"
import { createTransaction } from "@/lib/actions"

export function AddNewTransaction() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add transaction</DialogTitle>
            <DialogDescription>
              Add or subtract from your warehouse.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm setClose={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add transaction</DrawerTitle>
          <DrawerDescription>
            Add or subtract from your warehouse.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm setClose={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface TransactionForm {
  className?: React.ComponentProps<"form">;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileForm({ className, setClose }: TransactionForm) {
  const addOne = (() => {
    const input = document.getElementById('quantity') as HTMLInputElement;
    input.value = String(Number(input.value) + 1)
  })
  const subOne = (() => {
    const input = document.getElementById('quantity') as HTMLInputElement;
    input.value = String(Number(input.value) - 1)
  })

  const handleCreateTransaction = async (formData: FormData) => {
    createTransaction(formData)
    setClose(false)
  };

  return (
    <form className={cn("grid items-start gap-4 px-4", className)} action={handleCreateTransaction}>
      <div className="flex items-center">
        <Button className="flex rounded-full w-12 h-12" variant="secondary" onClick={subOne} type="button"><Minus className="w-4 h-4"/></Button>
        <input 
          id="quantity"
          key="quantity"
          name="quantity"
          type="number"
          placeholder="0"
          inputMode="numeric" 
          onFocus={(e) => e.target.select()}
          className={`${GeistSans.className} font-bold text-8xl block text-foreground w-full text-center leading-none tracking-tighter`}
        />
        <Button className="flex rounded-full w-12 h-12" variant="secondary" onClick={addOne} type="button"><PlusIcon className="w-4 h-4"/></Button>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
