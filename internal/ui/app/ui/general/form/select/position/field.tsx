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
import { Label } from "@/components/label";
import { useState, useEffect } from "react";
import SelectZone from "../zone/field";
import SelectAisle from "../aisle/field";
import SelectRack from "../rack/field";
import SelectShelf from "../shelf/field";
import AddZoneDialog from "../../add/zone/dialog";

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
  dict_zone_add_dialog }: SelectPositionProps) {

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
    setAisle(item)
  }
  async function addNewRack(item: Rack) {
    const newList = racksList;
    newList.push(item)
    setRacksList(newList)
    setRack(item)
  }
  async function addNewShelf(item: Shelf) {
    const newList = shelfsList;
    newList.push(item)
    setShelfsList(newList)
    setShelf(item)
  }

  // TO TEST: Everything will go down one by one
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
      <div>
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
      { zone.id !== "" && (
        <SelectAisle
          aisles={aislesFilteredList}
          aisle={aisle}
          setAisle={setAisle}
          dict_aisle_select={dict_aisle_select}
        />
      )}
      { aisle.id !== "" && (
        <SelectRack 
          racks={racksFilteredList}
          rack={rack}
          setRack={setRack}
          dict_rack_select={dict_rack_select}
        />
      )}
      { rack.id !== "" && (
        <SelectShelf
          shelfs={shelfsFilteredList}
          shelf={shelf}
          setShelf={setShelf}
          dict_shelf_select={dict_shelf_select}
        />
      )}
    </>
  )
}
