"use client"
import { Button } from "@/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { useActionState } from "react";
import { handlerForm } from "./action";
import { useEffect } from "react"

interface DialogProps {
  handler: any;
}

export function DialogDemo({ handler }: DialogProps) {
  const [state, action] = useActionState(handlerForm, 0)
  console.log(state)

  useEffect(() => {
    if (state === 2) {
      console.log("HADLER THING")
      handler()
    }
  }, [state])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
        <form action={action} id="dialog">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="RUST THING"
                className="col-span-3"
              />

              <Button type="submit" form="dialog">Save changes</Button>
            </form>
          </div>
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
