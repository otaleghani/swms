"use client";

import ZoneSelectField from "@/app/ui/modules/zones/misc/ZoneSelectField";
import { Zones, Zone } from "@/app/lib/types/data/zones";
import { useState } from "react";

interface ComponentTestingProps {
  list: Zones,
  dict: any;
}

export default function ComponentTesting({
  list,
  dict,

}: ComponentTestingProps) {
  const [element, setElement] = useState({id: "", name: ""} as Zone);
  const errors: string[] = [];

  return (
    <ZoneSelectField 
      list={list}
      element={element}
      setElement={setElement}
      dict={dict}
      errors={errors}
    />
  )
}
