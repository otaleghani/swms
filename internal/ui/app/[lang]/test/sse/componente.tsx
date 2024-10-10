"use client" 

import { Zones } from "@/app/lib/types/data/zones";
import { useEffect, useState } from "react";
import streamer from "@/app/lib/workers";

export default function Componente({
  zones
}: {zones: Zones}) {
  const [zonesx, setZones] = useState(zones);

  const obtainAPIResponse = async (apiRoute: string) => {
    // Initiate the first call to connect to SSE API
    //let sse = new EventSource(apiRoute)
    //sse.onmessage = (event: MessageEvent<any>) => {
    //  const eventData = JSON.parse(event.data);

    //  const filteredZones = zonesx.map((item) => {
    //    if (item.id === eventData.id) {
    //      item.id = "SUSSUS"
    //    }
    //    return item;
    //  })

    //  setZones(filteredZones)
    //}
  };

  useEffect(() => {
    //streamer.postMessage("somethig")
    streamer.onmessage = (event) => {
      console.log("got back something");
      console.log(event.data);
    }
    //obtainAPIResponse("/api/stream")
  }, [streamer.onmessage]);

  return (
    <>
    {zonesx.map((zone)=> (
      <div className="bg-red-50 m-1 text-sm" key={zone.id}>
        {zone.id}
      </div>
    ))}
    </>
  )
}
 
