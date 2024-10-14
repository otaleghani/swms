"use client" 

import { Zones } from "@/app/lib/types/data/zones";
import { useEffect, useState } from "react";
// import streamer from "@/app/lib/workers";
import Single from "./single";
import streamer from "@/app/lib/workers";

export default function Componente({
  zones
}: {zones: Zones}) {
  const [zonesx, setZones] = useState(zones);
  const [key, setKey] = useState("");

  useEffect(() => {
    //let streamer = new Worker("/workers/streamer.js")
    const handler = (data: any) => {
      console.log("Listened to the streamer")
      console.log(data.data)
    }
    streamer.addEventListener("message", handler)
  }, []);

  return (
    <>
    {zonesx.map((zone)=> (
      <Single zoneProp={zone} key={zone.id}/>
    ))}
    </>
  )
}
 
