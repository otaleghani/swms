"use client";

import { useActionState, useState } from "react"
import { DeleteAisleState, DeleteAisleAction } from "./action";

import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";

import { Aisle } from "@/app/lib/types";

interface DeleteAisleProps {
  dict: any;
  locale: string;
  item: Aisle;
  aisles: Aisle[];
  dict_aisle_select: any;
}

function DeleteAisleForm({ 
  dict, 
  locale, 
  item, 
  aisles, 
  dict_aisle_select }: DeleteAisleProps) {
  const initialState: DeleteAisleState = {
    error: false,
    errorMessages: { id: [], aisle: [] },
    message: "",
  }
  const [state, action] = useActionState(DeleteAisleAction, initialState);
  const [aisle, setAisle] = useState({id: "", name: "", zone: ""});

  return (
    <>
      <form action={action}>
        <SelectAisle 
          aisle={aisle}
          setAisle={setAisle}
          aisles={aisles}
          dict_aisle_select={dict_aisle_select}
        />
        <FormFieldError 
          id="quantity-error" 
          description={state.errorMessages.aisle} />
        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={item.id} name="id" />
        <Button type="submit" className="w-full mt-2">{dict.button}</Button>
        {state.error ? (
          <FormError 
            message={state.message!} />
        ) 
        : (
          <FormSuccess message={state.message!} />
        )}
      </form>
    </>
  )
}

import * as React from "react"
import { useMediaQuery } from "usehooks-ts";
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
import { Input } from "@/components/input";
import { Trash2 } from "lucide-react";
import SelectAisle from "../../general/form/select/aisle/field";

export function DeleteAndSubAisleDialog({
  dict, 
  locale, 
  item, 
  aisles, 
  dict_aisle_select }: DeleteAisleProps) {

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="aspect-square p-0">
            <Trash2 className="w-[1.2rem] h-[1.2rem]" />
          </Button>
       </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict.title}</DialogTitle>
            <DialogDescription>{dict.description}</DialogDescription>
          </DialogHeader>
          <DeleteAisleForm 
            dict={dict} 
            locale={locale} 
            item={item}
            aisles={aisles}
            dict_aisle_select={dict_aisle_select} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="aspect-square p-0">
          <Trash2 className="w-[1.2rem] h-[1.2rem]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict.title}</DrawerTitle>
          <DrawerDescription>{dict.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <DeleteAisleForm 
            dict={dict} 
            locale={locale} 
            item={item}
            aisles={aisles}
            dict_aisle_select={dict_aisle_select} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{dict.clear_button}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
