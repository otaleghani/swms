"use client";

// Actions
import { useState, useEffect } from "react";
import { syncRackWithExtra } from "@/app/lib/synchronizers/extra/racks/single";

// Components
import { Warehouse } from "lucide-react";
import FetchToastPattern from "../../patterns/FetchToast";
import LabelZone from "../labels/LabelZone";
import LabelAisle from "../labels/LabelAisle";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { RackWithExtra } from "@/app/lib/types/data/racks";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFetchingToasts } from "@/app/lib/types/dictionary/toasts";
import { Zone, Zones } from "@/app/lib/types/data/zones";
import { Aisle, Aisles } from "@/app/lib/types/data/aisles";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

interface Props {
  item: RackWithExtra;
  dictCard: DictLabelList<"shelfs" | "items" | "zone" | "aisle">;
  dictToast: DictFetchingToasts;
  zonesList: Zones;
  aislesList: Aisles;
}

export default function HeroRackSingle({
  item,
  dictCard,
  dictToast,
  zonesList,
  aislesList
}: Props) {
  const [rackWithExtra, setRackWithExtra] = useState(item);
  const [zones, setZones] = useState(zonesList);
  const [aisles, setAisles] = useState(aislesList);
  const [zone, setZone] = useState(zones.find(
    (zone) => zone.id === rackWithExtra.rack.zone
  ) as Zone);
  const [aisle, setAisle] = useState(aisles.find(
    (aisle) => aisle.id === rackWithExtra.rack.aisle
  ) as Aisle);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeList({
      streamer: streamer as Worker,
      list: zones,
      setList: setZones,
      type: "Zone",
    });
    synchronizeList({
      streamer: streamer as Worker,
      list: aisles,
      setList: setAisles,
      type: "Aisle",
    });

    syncRackWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: rackWithExtra,
      setElement: setRackWithExtra,
    });
  }, []);

  useEffect(() => {
    setZone(zones.find(
      (zone) => zone.id === rackWithExtra.rack.zone
    ) as Zone);
    setAisle(aisles.find(
      (aisle) => aisle.id === rackWithExtra.rack.aisle
    ) as Aisle);
  }, [rackWithExtra])

  return (
    <header className="p-4 border-b">
      <h1 className="font-semibold text-2xl xl:text-2xl tracking-tight">
        {rackWithExtra.rack.name}
      </h1>
      <span className="font-light">{rackWithExtra.rack.id}</span>
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
              {rackWithExtra.itemsCount}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.shelfs}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              {rackWithExtra.shelfsCount}
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

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.aisle}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              <LabelAisle 
                aisle={aisle}
                setAisle={setAisle}
              />
            </div>
          </div>
        </div>

      </div>
      <FetchToastPattern 
        type="Rack"
        dict={dictToast}
        id={rackWithExtra.rack.id as string}
      />
    </header>
  )
}
