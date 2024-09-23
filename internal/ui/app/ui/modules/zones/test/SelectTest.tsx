"use client";
import { Zone, Zones } from "@/app/lib/types/data/zones";
import { DictSelectField } from "@/app/lib/types/dictionary/form";
import ZoneSelectField from "../misc/ZoneSelectField";
//here the select test

import { useState } from "react";

interface props {
  list: Zones;
  name: string;
  dict: DictSelectField;
}
export default function TestSelect({
  list,
  name,
  dict,
}: props) {
  const errors: string[] = [];
  const [element, setElement] = useState({id: "", name: ""} as Zone)

  return (
    <ZoneSelectField 
      name={name}
      list={list as Zone[]}
      element={element}
      setElement={setElement}
      dict={dict}
      errors={errors}
    />
  )
}
