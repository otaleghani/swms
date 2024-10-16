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
import { SyncState } from "@/app/lib/synchronizers/utils";
import { synchronizeZoneWithExtra } from "@/app/lib/synchronizers/data/zones";

interface ZoneWithExtraCardProps {
  item: ZoneWithExtra,
  //dictCard: DictLabelList<"aisles" | "items">
  //dialogEdit: DictDialog;
  //dialogReplace: DictDialog;
}

export default function ZoneWithExtraCard({
  item
}: ZoneWithExtraCardProps) {
  const [zoneWithExtra, setZoneWithExtra] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeZoneWithExtra(
      streamer as Worker,
      syncState,
      setSyncState,
      zoneWithExtra,
      setZoneWithExtra,
    )

    return () => {
      streamer?.terminate();
    };
  }, []);

  return (
    <>
      { syncState && (
        <CardWrapper 
          className={
            //change === "replace" ? "!bg-red-500" : 
            syncState === "remove" ? "animate-delete" :
            syncState === "update" ? "animate-update" :
            syncState === "done" ? "hidden" :
            ""
          }
          Header={() => {
            return (
              <CardWrapperHeader
                title={zoneWithExtra.zone.name}
                description={zoneWithExtra.zone.id}
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
