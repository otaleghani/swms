"use client";

import { useActionState, useState, useEffect } from "react"
import { EditRackState, EditRackAction } from "@/app/ui/racks/edit/action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import SelectZone from "../../general/form/select/zone/field";
import SelectAisle from "../../general/form/select/aisle/field";
import { Aisle, Rack, Zone } from "@/app/lib/types";

interface EditAisleProps {
  rack: Rack;
  aisles: Aisle[];
  zones: Zone[];
  locale: string;
  dict: any;
  dict_zone_select: any;
  dict_aisle_select: any;
}

function EditRackForm({ 
  rack,
  aisles,
  zones,
  locale, 
  dict, 
  dict_zone_select, 
  dict_aisle_select, 
  }: EditAisleProps) {

  const initialState: EditRackState = {
    error: false,
    errorMessages: { name: [], id: [], zone: [], aisle: [] },
    message: "",
  }
  const [state, action] = useActionState(EditRackAction, initialState);
  const [zone, setZone] = useState({id: "", name: ""});
  const [aisle, setAisle] = useState({id: "", name: "", zone: ""});
  const [filteredAisles, setFilteredAisles] = useState(aisles);
  
  console.log(zone)

  useEffect(() => {
    // Filters subcategories based on the select category
    const newList = []
    for (let i = 0; i < aisles.length; i++) {
      if (aisles[i].zone === zone.id) {
        newList.push(aisles[i])
      }
    }
    setFilteredAisles(newList)
  }, [zone])

  return (
    <>
      <form action={action}>
       <div>
          <Label>{dict.fields.name.label}</Label>
          <Input 
            name="name"
            defaultValue={rack.name}
            placeholder={rack.name}
          />
          <FormFieldError 
            id="name-error" 
            description={state.errorMessages.name} />
        </div>

        <SelectZone
          zone={zone}
          setZone={setZone}
          zones={zones}
          dict_zone_select={dict_zone_select} />

        {zone.id !== "" && (
          <SelectAisle
            dict_aisle_select={dict_aisle_select}
            aisles={filteredAisles} />
        )}

        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={rack.id} name="id" />

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

export function EditRackDialog({
  rack,
  aisles,
  zones,
  locale, 
  dict, 
  dict_zone_select, 
  dict_aisle_select, 
  }: EditAisleProps) {

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{dict.dialog_button}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict.title}</DialogTitle>
            <DialogDescription>{dict.description}</DialogDescription>
          </DialogHeader>
          <EditRackForm 
            rack={rack}
            aisles={aisles}
            zones={zones}
            locale={locale}  
            dict={dict} 
            dict_zone_select={dict_zone_select}
            dict_aisle_select={dict_aisle_select} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{dict.dialog_button}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dict.title}</DrawerTitle>
          <DrawerDescription>{dict.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <EditRackForm 
            rack={rack}
            aisles={aisles}
            zones={zones}
            locale={locale}  
            dict={dict} 
            dict_zone_select={dict_zone_select}
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
