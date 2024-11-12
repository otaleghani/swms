"use client";

// Actions
import { useState, useEffect } from "react";
import { syncAisleWithExtra } from "@/app/lib/synchronizers/extra/aisles/single";

// Components
import { Warehouse } from "lucide-react";
import FetchToastPattern from "../../patterns/FetchToast";
import LabelZone from "../labels/LabelZone";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { AisleWithExtra } from "@/app/lib/types/data/aisles";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFetchingToasts } from "@/app/lib/types/dictionary/toasts";
import { Zone, Zones } from "@/app/lib/types/data/zones";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

interface Props {
  item: AisleWithExtra;
  dictCard: DictLabelList<"racks" | "items" | "zone">;
  dictToast: DictFetchingToasts;
  zonesList: Zones;
}

export default function HeroAisleSingle({
  item,
  dictCard,
  dictToast,
  zonesList
}: Props) {
  const [aisleWithExtra, setAisleWithExtra] = useState(item);
  const [zones, setZones] = useState(zonesList);
  const [zone, setZone] = useState(zones.find(
    (zone) => zone.id === aisleWithExtra.aisle.zone
  ) as Zone);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeList({
      streamer: streamer as Worker,
      list: zones,
      setList: setZones,
      type: "Zone",
    });

    syncAisleWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: aisleWithExtra,
      setElement: setAisleWithExtra,
    });
  }, []);

  useEffect(() => {
    setZone(zones.find(
      (zone) => zone.id === aisleWithExtra.aisle.zone
    ) as Zone);
  }, [aisleWithExtra])

  return (
    <header className="p-4 border-b">
      <h1 className="font-semibold text-2xl xl:text-2xl tracking-tight">
        {aisleWithExtra.aisle.name}
      </h1>
      <span className="font-light">{aisleWithExtra.aisle.id}</span>
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
              {aisleWithExtra.itemsCount}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.racks}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              {aisleWithExtra.racksCount}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.zone}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              <LabelZone 
                zone={zone}
                setZone={setZone}
              />
            </div>
          </div>
        </div>

      </div>
      <FetchToastPattern 
        type="Aisle"
        dict={dictToast}
        id={aisleWithExtra.aisle.id as string}
      />
    </header>
  )
}
