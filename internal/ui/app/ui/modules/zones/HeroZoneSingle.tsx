"use client";

// Actions
import { useState, useEffect } from "react";
import { syncZoneWithExtra } from "@/app/lib/synchronizers/extra/zones/single";

// Components
import { Warehouse } from "lucide-react";
import FetchToastPattern from "../../patterns/FetchToast";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { ZoneWithExtra } from "@/app/lib/types/data/zones";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { DictLabelList } from "@/app/lib/types/dictionary/misc";
import { useToast } from "../../components/hooks/use-toast";
import { DictFetchingToasts, DictToast } from "@/app/lib/types/dictionary/toasts";

interface Props {
  item: ZoneWithExtra;
  dictCard: DictLabelList<"aisles" | "items">;
  dictToast: DictFetchingToasts;
}

export default function HeroZoneSingle({
  item,
  dictCard,
  dictToast
}: Props) {
  const [zoneWithExtra, setZoneWithExtra] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    // What happens if this is the element deleted?
    syncZoneWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: zoneWithExtra,
      setElement: setZoneWithExtra,
    });
  }, []);

  return (
    <header className="p-4 border-b">
      <h1 className="font-semibold text-2xl xl:text-2xl tracking-tight">
        {zoneWithExtra.zone.name}
      </h1>
      <span className="font-light">{zoneWithExtra.zone.id}</span>
      <div className="grid xl:grid-cols-2 gap-2 pt-4">

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.items}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              {zoneWithExtra.itemsCount}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.aisles}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              {zoneWithExtra.aislesCount}
            </div>
          </div>
        </div>
      </div>
      <FetchToastPattern 
        type="Zone"
        dict={dictToast}
        id={zoneWithExtra.zone.id as string}
      />
    </header>
  )
}
