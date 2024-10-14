"use client";

/** React hooks */
import { useState, useEffect } from "react";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";

/** Web workers */
import streamer from "@/app/lib/workers";
//import { WorkerResponse } from "@/app/lib/workers/streamer";
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { ZoneWithExtra } from "@/app/lib/types/data/zones";

interface ZoneWithExtraCardProps {
  item: ZoneWithExtra,
  //dictCard: DictLabelList<"aisles" | "items">
  //dialogEdit: DictDialog;
  //dialogReplace: DictDialog;
}

/**
* none:       no active change to display
* replace:    plays when the item get's replaced, returns to "done"
* remove:     plays when the item get's removed, returns to "done"
* update:     plays when the item get's updated, returns to "none"
* done:       adds a display none to the item
*/
type Change = "none" | "replace" | "remove" | "update" | "done";

export default function ZoneWithExtraCard({
  item
}: ZoneWithExtraCardProps) {
  //const [name, setName] = useState(zone.name);
  const [zone, setZone] = useState(item)
  const [change, setChange] = useState("none" as Change)

  useEffect(() => {
    const handler = (response: MessageEvent<any>) => {
      console.log("got HERE")
      if (response.data.type === "Zone" && 
        response.data.id === zone.id) {
        if (response.data.action === "replace") {
          setChange("replace");
        }
        if (response.data.action === "remove") {
          setChange("remove");
        }
        if (response.data.action === "update") {
          setZone(response.data.content)
          setChange("update")
        }
      }
    }
    streamer.addEventListener("message", handler)

    // return () => {
    //   streamer.terminate();
    // };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (change === "update") {
        setChange("none");
      } else {
        setChange("done");
      }
    }, 500);
    
    return () => clearInterval(timer);
  }, [change]);

  return (

    <CardWrapper 
      className={
        change === "replace" ? "transition-colors bg-red-500" : 
        change === "remove" ? "transition-colors bg-red-500" :
        change === "update" ? "transition-colors bg-yellow-500" :
        change === "done" ? "hidden" :
        ""
      }
      Header={() => {
        return (
          <CardWrapperHeader
            title={zone.name}
            description={zone.id}
          />
        )
      }}
      Content={() => {
        return (
          <></>
        )
      }}
      Footer={() => {
        return (
          <></>
        )
      }}
    />
  )
} 
