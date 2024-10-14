"use client";

/** React hooks */
import { useState, useEffect } from "react";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";

/** Web workers */
import streamer from "@/app/lib/workers";
import { WorkerResponse } from "@/app/lib/workers/streamer";
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { Zone } from "@/app/lib/types/data/zones";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";

interface ZoneWithExtraCardProps {
  item: Zone,
  dictCard: DictLabelList<"aisles" | "items">
  dialogEdit: DictDialog;
  dialogReplace: DictDialog;
}

type Change = "none" | "replace" | "remove" | "update";

export default function ZoneWithExtraCard({
  item
}: ZoneWithExtraCardProps) {
  //const [name, setName] = useState(zone.name);
  const [zone, setZone] = useState(item)
  const [change, setChange] = useState("none" as Change)

  useEffect(() => {
    const handler = (response: MessageEvent<WorkerResponse>) => {
      if (response.data.type === "Zone" && 
        response.data.id === zone.id) {
        if (response.data.action === "replace") {
          // animate out if it's the replaced
          // animate in if it's the replacer
        }
        if (response.data.action === "remove") {
          // animate ou2
        }
        if (response.data.action === "update") {

          // animate in
        }

        //if (response.data.action === "create") {}
        //if (response.data.action === "createInBulk") {}
        //setName(response.data.content.name);

      }
    }
    streamer?.addEventListener("message", handler)
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setChange("none")
    }, 500);
    
    return () => clearInterval(timer);
  }, [change]);

  return (

    <CardWrapper 
      className={
        change === "replace" ? "sus" : 
        change === "remove" ? "sas" :
        change === "update" ? "sis" :
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
