"use client";

import { useActionState, useState } from "react"
import { DeleteZoneState, DeleteZoneAction } from "@/app/ui/zones/delete_safe/action";

import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";

import { Zone } from "@/app/lib/types";

interface DeleteZoneProps {
  dict: any;
  locale: string;
  item: Zone;
  zones: Zone[];
  dict_zone_select: any;
}

function DeleteZoneForm({ dict, locale, item, zones, dict_zone_select }: DeleteZoneProps) {
  const initialState: DeleteZoneState = {
    error: false,
    errorMessages: { id: [], zone: [] },
    message: "",
  }
  const [state, action] = useActionState(DeleteZoneAction, initialState);
  const [zone, setZone] = useState({id: "", name: ""});

  return (
    <>
      <form action={action}>
        <SelectZone
          dict_zone_select={dict_zone_select}
          zone={zone}
          setZone={setZone}
          zones={zones} />

        <FormFieldError 
          id="quantity-error" 
          description={state.errorMessages.zone} />
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
import { Label } from "@/components/label";
import SelectZone from "../../general/form/select/fields/zone/field";
import { Trash2 } from "lucide-react";

export function DeleteAndSubZoneDialog({ dict, locale, item, zones, dict_zone_select }: DeleteZoneProps) {
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
          <DeleteZoneForm 
            dict={dict} 
            locale={locale} 
            item={item}
            zones={zones}
            dict_zone_select={dict_zone_select} />
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
          <DeleteZoneForm 
            dict={dict} 
            locale={locale} 
            item={item}
            zones={zones}
            dict_zone_select={dict_zone_select} />
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
