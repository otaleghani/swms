"use client"

import { Zone, Zones } from "@/app/lib/types/data/zones";
import { useEffect, useState } from "react";
import streamer from "@/app/lib/workers";

export default function Single({zoneProp}: {zoneProp: Zone}) {
  const [zone, setZone] = useState(zoneProp);
  const [key, setKey] = useState("");

  useEffect(() => {
    const handler = (data: any) => {
      console.log(data.data.key)
    }
    streamer.addEventListener("message", handler)
    //streamer.onmessage = (event) => {
    //  console.log("helo")
    //  if (event.data.key) {
    //    setKey(event.data.key);
    //  }
    //  if (event.data.type === "Zones") {
    //    console.log("From Item: I GOT SOMETHING")
    //  }
    //}
  }, []);

  return (
    <div className="bg-red-50 m-1 text-sm">
      {zone.id}
    </div>
  )
}
