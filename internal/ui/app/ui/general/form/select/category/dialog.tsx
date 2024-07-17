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
import { Loader2 } from "lucide-react"
import { useActionState, useEffect, useState } from "react";

import { AddNewCategory, FormCategoryState } from "./action";

interface DialogProps {
  handler: any;
  lang: string;
  dict: {
    name: string;
    description: string;
    button: string;
    pending: string;
    success: string;
  };
}

export function DialogAddCategory({ handler, lang, dict }: DialogProps) {
  const initialState: FormCategoryState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    }
  }

  const [open, setOpen] = useState(false);
  const [state, action, isPending] = useActionState(AddNewCategory, initialState)
  console.log(state)

  useEffect(() => {
    if (!state.error && state.message) {
      setOpen(false)
      handler(state.result)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action} id="category_dialog">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
          <input type="hidden" name="locale" value={lang} />
              <div>
                <Label htmlFor="name" className="text-right">asd</Label>
                <Input
                  name="name"
                  placeholder={dict.name}
                />
              </div>
              <div>
                <Label htmlFor="name" className="text-right">asd</Label>
                <Input
                  name="description"
                  placeholder={dict.description}
                />
              </div>

          </div>
        </div>
        <DialogFooter>

        <Button disabled={isPending} className="mt-2 w-full" type="submit" form="category_dialog">
          {isPending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{dict.pending}</>
          : dict.button}
        </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
