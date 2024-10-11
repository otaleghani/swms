"use client"

import { Zone, Zones } from "@/app/lib/types/data/zones";
import { useEffect, useState } from "react";
import streamer from "@/app/lib/workers";

export default function Single({zoneProp}: {zoneProp: Zone}) {
  const [zone, setZone] = useState(zoneProp);
  const [key, setKey] = useState("");

  //useEffect(() => {
  //  const handler = (data: any) => {
  //    console.log(data.data.key)
  //  }
  //  streamer.addEventListener("message", handler)
  //}, []);

  return (
    <div className="bg-red-50 m-1 text-sm">
      {zone.id}
    </div>
  )
}
