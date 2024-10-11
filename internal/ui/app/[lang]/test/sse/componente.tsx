"use client" 

import { Zones } from "@/app/lib/types/data/zones";
import { useEffect, useState } from "react";
// import streamer from "@/app/lib/workers";
import Single from "./single";
import { emitter } from "@/app/lib/emitters";
import streamer from "@/app/lib/workers";

export default function Componente({
  zones
}: {zones: Zones}) {
  const [zonesx, setZones] = useState(zones);
  const [key, setKey] = useState("");

  useEffect(() => {
    const handler = (data: any) => {
      console.log(data)
    }
    streamer.addEventListener("message", handler)
    //streamer.onmessage = (event: any) => {
    //  console.log(event.data);
    //  if (event.data.key) {
    //    setKey(event.data.key);
    //  }
    //  const fetchData = async () => {
    //    const response = await fetch(
    //      `http://localhost:8080/api/v1/zones/${event.data.id}`, 
    //      {
    //        method: "GET",
    //        headers: { 
    //          "Content-Type": "application/json",
    //          "Authorization": `Bearer ${key}`,
    //        },
    //      }
    //    );
    //    if (!response.ok) {
    //      // error handling
    //    }
    //    const data = await response.json();
    //    console.log(data)
    //  }
    //  if (event.data.type === "Zones") {
    //    fetchData()
    //  }
    //}
  }, []);

  return (
    <>
    {zonesx.map((zone)=> (
      <Single zoneProp={zone} key={zone.id}/>
    ))}
    </>
  )
}
 
