"use client"

import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";

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
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerContent
} from "@/components/drawer"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Loader2, PlusCircleIcon } from "lucide-react"
import { useActionState, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts"

import { AddNewCategory, FormCategoryState } from "./action";

interface DialogProps {
  handler: any;
  lang: string;
  dict: {
    title: string;
    description: string;
    fields: {
      name: {
        label: string;
        placeholder: string;
      };
      description: {
        label: string;
        placeholder: string;
      };
    };
    button: string;
    pending: string;
    success: string;
  };
}


export function DialogAddCategory({ handler, lang, dict }: DialogProps) {
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
            <DialogTitle>{dict.title}</DialogTitle>
            <DialogDescription>{dict.description}</DialogDescription>
          </DialogHeader>
            <CategoryForm 
              handler={handler}
              lang={lang}
              dict={dict}
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
          <DrawerTitle>{dict.title}</DrawerTitle>
          <DrawerDescription>{dict.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <CategoryForm 
            handler={handler}
            lang={lang}
            dict={dict}
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

interface CategoryFormProps {
  handler: any;
  lang: string;
  dict: {
    title: string;
    description: string;
    fields: {
      name: {
        label: string;
        placeholder: string;
      };
      description: {
        label: string;
        placeholder: string;
      };
    };
    button: string;
    pending: string;
    success: string;
  };
  setOpen: any;
}

function CategoryForm({ handler, lang, dict, setOpen }: CategoryFormProps) {
  const initialState: FormCategoryState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    }
  }
  const [state, action, isPending] = useActionState(AddNewCategory, initialState)

  useEffect(() => {
    if (!state.error && state.message) {
      setOpen(false)
      handler(state.result)
    }
  }, [state])

  return (
    <form action={action} id="category_dialog">
      <div className="grid gap-4 py-4">
        <input type="hidden" name="locale" value={lang} />
        <div>
          <Label htmlFor="name" className="text-right">{dict.fields.name.label}</Label>
          <Input
            className={`${state.errorMessages.name.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="name"
            placeholder={dict.fields.name.placeholder}/>
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.name} />
        </div>
        <div>
          <Label htmlFor="name" className="text-right">{dict.fields.description.label}</Label>
          <Input
            className={`${state.errorMessages.description.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="description"
            placeholder={dict.fields.description.placeholder}
          />
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.description} />
        </div>
        <Button 
          disabled={isPending} 
          className="mt-2 w-full" 
          type="submit" 
          form="category_dialog">
            {isPending ? 
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{dict.pending}</>
            : dict.button}
        </Button>
        {state.error ? (
          <FormError 
            message={state.message!} />
        ) 
        : (
          <FormSuccess message={state.message!} />
        )}
      </div>
    </form>
  )
}
