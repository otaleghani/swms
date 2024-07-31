"use client";

import { useActionState, useState, useEffect } from "react"
import { EditShelfState, EditShelfAction } from "./action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";

import SelectZone from "../../general/form/select/zone/field";
import SelectAisle from "../../general/form/select/aisle/field";
import SelectRack from "../../general/form/select/rack/field";
import { Aisle, Rack, Zone, Shelf } from "@/app/lib/types";

interface EditShelfProps {
  shelf: Shelf;
  racks: Rack[];
  aisles: Aisle[];
  zones: Zone[];
  locale: string;
  dict: any;
  dict_zone_select: any;
  dict_aisle_select: any;
  dict_rack_select: any;
}

function EditShelfForm({ 
  shelf,
  racks,
  aisles,
  zones,
  locale, 
  dict, 
  dict_zone_select, 
  dict_aisle_select, 
  dict_rack_select, 
  }: EditShelfProps) {

  const initialState: EditShelfState = {
    error: false,
    errorMessages: { name: [], id: [], zone: [], aisle: [], rack: [] },
    message: "",
  }

  const [state, action] = useActionState(EditShelfAction, initialState);
  const [zone, setZone] = useState({id: "", name: ""});
  const [aisle, setAisle] = useState({id: "", name: "", zone: ""});
  const [rack, setRack] = useState({id: "", name: "", zone: "", aisle: ""});
  const [filteredAisles, setFilteredAisles] = useState(aisles);
  const [filteredRacks, setFilteredRacks] = useState(racks);
  
  useEffect(() => {
    // Filters subcategories based on the select category
    const newList = []
    for (let i = 0; i < aisles.length; i++) {
      if (aisles[i].zone === zone.id) {
        newList.push(aisles[i])
      }
    }
    setFilteredAisles(newList)
    setAisle({id: "", name: "", zone: ""});
  }, [zone])
  
  useEffect(() => {
    const newList = [];
    for (let i = 0; i < racks.length; i++) {
      if (racks[i].aisle === aisle.id) {
        newList.push(racks[i]);
      }
    }
    setFilteredRacks(newList)
    setRack({id: "", name: "", zone: "", aisle: ""});
  }, [aisle])

  return (
    <>
      <form action={action}>
       <div>
          <Label>{dict.fields.name.label}</Label>
          <Input 
            name="name"
            defaultValue={shelf.name}
            placeholder={shelf.name}
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
            aisle={aisle}
            setAisle={setAisle}
            dict_aisle_select={dict_aisle_select}
            aisles={filteredAisles} />
        )}

        {aisle.id !== "" && (
          <SelectRack
            rack={rack}
            setRack={setRack}
            dict_rack_select={dict_rack_select}
            racks={filteredRacks} />
        )}

        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={shelf.id} name="id" />

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

export function EditShelfDialog({
  shelf,
  racks,
  aisles,
  zones,
  locale, 
  dict, 
  dict_zone_select, 
  dict_aisle_select, 
  dict_rack_select, 
  }: EditShelfProps) {

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
          <EditShelfForm 
            shelf={shelf}
            racks={racks}
            aisles={aisles}
            zones={zones}
            locale={locale}  
            dict={dict} 
            dict_zone_select={dict_zone_select}
            dict_aisle_select={dict_aisle_select}
            dict_rack_select={dict_rack_select} />
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
          <EditShelfForm 
            shelf={shelf}
            racks={racks}
            aisles={aisles}
            zones={zones}
            locale={locale}  
            dict={dict} 
            dict_zone_select={dict_zone_select}
            dict_aisle_select={dict_aisle_select}
            dict_rack_select={dict_rack_select} />
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
