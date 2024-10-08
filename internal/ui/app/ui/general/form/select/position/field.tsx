"use client";
// Logic to show / hide the different fields + 
// expose an hidden input for every single field.
//
// if zone is present -> show aisles, hide racks shelfs
// if aisle is present -> show racks, hide shelfs
// if racks is present -> show shelfs
//
// We will use a useEffect to change the data 
// and useState for 


import { Zone, Aisle, Rack, Shelf } from "@/app/lib/types";
import { useState, useEffect } from "react";
import SelectZone from "../fields/zone/field";
import SelectAisle from "../fields/aisle/field";
import SelectRack from "../fields/rack/field";
import SelectShelf from "../fields/shelf/field";
import AddZoneDialog from "../../add/zone/dialog";
import AddAisleDialog from "../../add/aisle/dialog";
import AddRackDialog from "../../add/rack/dialog";
import AddShelfDialog from "../../add/shelf/dialog";
import FormFieldError from "../../error_field";

interface SelectPositionProps {
  locale: string;

  zones: Zone[];
  aisles: Aisle[];
  racks: Rack[];
  shelfs: Shelf[];

  dict_zone_select: any;
  dict_aisle_select: any;
  dict_rack_select: any;
  dict_shelf_select: any;

  dict_zone_add_dialog: any;
  dict_aisle_add_dialog: any;
  dict_rack_add_dialog: any;
  dict_shelf_add_dialog: any;

  description_zone: string[];
  description_aisle: string[];
  description_rack: string[];
  description_shelf: string[];
}

export default function SelectPosition({ 
  locale,

  zones, 
  aisles, 
  racks, 
  shelfs, 

  dict_zone_select,
  dict_aisle_select,
  dict_rack_select,
  dict_shelf_select,

  dict_zone_add_dialog,
  dict_aisle_add_dialog,
  dict_rack_add_dialog,
  dict_shelf_add_dialog,

  description_zone,
  description_aisle,
  description_rack,
  description_shelf,
}: SelectPositionProps) {

  const [zone, setZone] = useState({id: "", name: ""} as Zone);
  const [aisle, setAisle] = useState({id: "", name: "", zone: ""} as Aisle);
  const [rack, setRack] = useState({id: "", name: "", zone: "", aisle: ""} as Rack);
  const [shelf, setShelf] = useState({id: "", name: "", zone: "", aisle: "", rack: ""} as Shelf);

  const [zonesList, setZonesList] = useState(zones);
  const [aislesList, setAislesList] = useState(aisles);
  const [aislesFilteredList, setAislesFilteredList] = useState(aisles);
  const [racksList, setRacksList] = useState(racks);
  const [racksFilteredList, setRacksFilteredList] = useState(racks);
  const [shelfsList, setShelfsList] = useState(shelfs);
  const [shelfsFilteredList, setShelfsFilteredList] = useState(shelfs);

  // Functions responsible to update the current list so that it contains the new item
  // and update the current item in place.
  async function addNewZone(item: Zone) {
    const newList = zonesList;
    newList.push(item)
    setZonesList(newList)
    setZone(item)
  }
  async function addNewAisle(item: Aisle) {
    const newList = aislesList;
    newList.push(item)
    setAislesList(newList)
    
    // had to reset the filtered list too
    const newFilteredList = [];
    for (let i = 0; i < aislesList.length; i++) {
      if (aislesList[i].zone === zone.id) {
        newFilteredList.push(aislesList[i]);
      }
    }
    setAislesFilteredList(newFilteredList);
    setAisle(item)
  }
  async function addNewRack(item: Rack) {
    const newList = racksList;
    newList.push(item)
    setRacksList(newList)
    const newFilteredList = [];
    for (let i = 0; i < racksList.length; i++) {
      if (racksList[i].aisle === aisle.id) {
        newFilteredList.push(racksList[i]);
      }
    }
    setRacksFilteredList(newFilteredList);
    setRack(item)
  }
  async function addNewShelf(item: Shelf) {
    const newList = shelfsList;
    newList.push(item)
    setShelfsList(newList)
    const newFilteredList = [];
    for (let i = 0; i < shelfsList.length; i++) {
      if (shelfsList[i].rack === rack.id) {
        newFilteredList.push(shelfsList[i]);
      }
    }
    setShelfsFilteredList(newFilteredList);
    setShelf(item)
  }

  useEffect(() => {
    if (aisle.zone !== zone.id) {
      setAisle({id: "", name: "", zone: ""})
      // If the single had to chage, surely the list has to change too
      const newList = [];
      for (let i = 0; i < aislesList.length; i++) {
        if (aislesList[i].zone === zone.id) {
          newList.push(aislesList[i]);
        }
      }
      setAislesFilteredList(newList);
    }
  }, [zone])
  useEffect(() => {
    if (rack.aisle !== aisle.id) {
      setRack({id: "", name: "", zone: "", aisle: ""})
      const newList = [];
      for (let i = 0; i < racksList.length; i++) {
        if (racksList[i].aisle === aisle.id) {
          newList.push(racksList[i]);
        }
      }
      setRacksFilteredList(newList);
    }
  }, [aisle])
  useEffect(() => {
    if (shelf.rack !== rack.id) {
      setShelf({id: "", name: "", zone: "", aisle: "", rack: ""})
      const newList = [];
      for (let i = 0; i < shelfsList.length; i++) {
        if (shelfsList[i].rack === rack.id) {
          newList.push(shelfsList[i]);
        }
      }
      setShelfsFilteredList(newList);
    }
  }, [rack])

  return (
    <>
      <div className="mb-2">
        <div className="flex items-end mb-2">
          <SelectZone 
            zones={zonesList}
            zone={zone}
            setZone={setZone}
            dict_zone_select={dict_zone_select}
          />
          <AddZoneDialog
            handleAddZone={addNewZone}
            dict_zone_add_dialog={dict_zone_add_dialog}
            lang={locale} 
          />
        </div>
        <FormFieldError 
          id="zone-errors"
          description={description_zone}
        />
      </div>
      { zone.id !== "" && (
        <div className="mb-2">
          <div className="flex items-end mb-2">
            <SelectAisle
              aisles={aislesFilteredList}
              aisle={aisle}
              setAisle={setAisle}
              dict_aisle_select={dict_aisle_select}
            />
            <AddAisleDialog
              handleAddAisle={addNewAisle}
              dict_aisle_add_dialog={dict_aisle_add_dialog}
              lang={locale}
              zone={zone}
            />
          </div>
        <FormFieldError 
          id="aisle-errors"
          description={description_aisle}
        />
      </div>
      )}
      { aisle.id !== "" && (
        <div className="mb-2">
          <div className="flex items-end mb-2">
            <SelectRack 
              racks={racksFilteredList}
              rack={rack}
              setRack={setRack}
              dict_rack_select={dict_rack_select}
            />
            <AddRackDialog 
              handleAddRack={addNewRack}
              dict_rack_add_dialog={dict_rack_add_dialog}
              lang={locale}
              zone={zone}
              aisle={aisle}
            />
          </div>
        <FormFieldError 
          id="rack-errors"
          description={description_rack}
        />
      </div>
      )}
      { rack.id !== "" && (
        <div className="mb-2">
          <div className="flex items-end mb-2">
            <SelectShelf
              shelfs={shelfsFilteredList}
              shelf={shelf}
              setShelf={setShelf}
              dict_shelf_select={dict_shelf_select}
            />
            <AddShelfDialog
              handleAddShelf={addNewShelf}
              dict_shelf_add_dialog={dict_shelf_add_dialog}
              lang={locale}
              zone={zone}
              aisle={aisle}
              rack={rack}
            />
          </div>
        <FormFieldError 
          id="shelf-errors"
          description={description_shelf}
        />
      </div>
      )}
    </>
  )
}
