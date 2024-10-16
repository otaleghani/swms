"use client";

/** React hooks */
import { useState, useEffect } from "react";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";

/** Web workers */
import streamer from "@/app/lib/workers";
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { ZoneWithExtra } from "@/app/lib/types/data/zones";
import { delaySyncStateToNone, SyncState } from "@/app/lib/synchronizers/utils";
import { synchronizeZoneWithExtraSingle } from "@/app/lib/synchronizers/data/zonesWithExtra";

interface ZoneWithExtraCardProps {
  item: ZoneWithExtra & {isNew?: boolean},
  //dictCard: DictLabelList<"aisles" | "items">
  //dialogEdit: DictDialog;
  //dialogReplace: DictDialog;
}

export default function ZoneWithExtraCard({
  item
}: ZoneWithExtraCardProps) {
  const [zoneWithExtra, setZoneWithExtra] = useState(item);
  const [syncState, setSyncState] = useState(
    item.isNew ? "new" as SyncState : "none" as SyncState
  );

  useEffect(() => {
    synchronizeZoneWithExtraSingle(
      streamer as Worker,
      setSyncState,
      zoneWithExtra,
      setZoneWithExtra,
    );
    
    // This resets in theory to "none" if "new"
    delaySyncStateToNone(setSyncState);

    return () => {
      streamer?.terminate();
    };
  }, []);

  return (
    <>
      { syncState != "hidden" && (
        <CardWrapper 
          className={
            syncState === "new" ? "animate-new" :
            syncState === "remove" ? "animate-delete" :
            syncState === "update" ? "animate-update" :
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
