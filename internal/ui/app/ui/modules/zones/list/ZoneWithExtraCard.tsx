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
  const [zone, setZone] = useState(item)
  const [change, setChange] = useState("none" as Change)

  useEffect(() => {
    const handler = (response: MessageEvent<any>) => {
      if ((
        response.data.type == "Zone" ||
        response.data.type == "Aisle" ||
        response.data.type == "Item"
      ) && (
        response.data.id === zone.zone.id ||
        response.data.zone === zone.zone.id
      )) {
        //console.log(response.data.after);
        //console.log(response.data.before);
        streamer?.postMessage({
           type: "ZoneWithExtra",
           id: zone.zone.id
        })
      }

      if (response.data.type == "ZoneWithExtra" && 
        response.data.content.zone.id == zone.zone.id) {
        setChange("update")
        setZone(response.data.content)
      }
    }
    streamer?.addEventListener("message", handler)

    return () => {
      streamer?.terminate();
    };
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
    <>
      { change !== "remove" && (
        <CardWrapper 
          className={
            change === "replace" ? "transition-colors bg-red-500" : 
            //change === "remove" ? "transition-colors bg-red-500" :
            change === "update" ? "transition-colors bg-yellow-500" :
            change === "done" ? "hidden" :
            "transition-colors bg-white"
          }
          Header={() => {
            return (
              <CardWrapperHeader
                title={zone.zone.name}
                description={zone.zone.id}
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
      )}
    </>
  )
} 
