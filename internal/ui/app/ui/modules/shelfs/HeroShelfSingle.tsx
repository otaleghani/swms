"use client";

// Actions
import { useState, useEffect } from "react";
import { syncShelfWithExtra } from "@/app/lib/synchronizers/extra/shelfs/single";

// Components
import { Warehouse } from "lucide-react";
import FetchToastPattern from "../../patterns/FetchToast";
import LabelZone from "../labels/LabelZone";
import LabelAisle from "../labels/LabelAisle";
import LabelRack from "../labels/LabelRack";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { SyncState } from "@/app/lib/synchronizers/utils";
import { DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFetchingToasts } from "@/app/lib/types/dictionary/toasts";
import { Zone, Zones } from "@/app/lib/types/data/zones";
import { Aisle, Aisles } from "@/app/lib/types/data/aisles";
import { Rack, Racks } from "@/app/lib/types/data/racks";
import { ShelfWithExtra } from "@/app/lib/types/data/shelfs";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

interface Props {
  item: ShelfWithExtra;
  dictCard: DictLabelList<"items" | "zone" | "aisle" | "rack">;
  dictToast: DictFetchingToasts;
  zonesList: Zones;
  aislesList: Aisles;
  racksList: Racks;
}

export default function HeroShelfSingle({
  item,
  dictCard,
  dictToast,
  zonesList,
  aislesList,
  racksList
}: Props) {
  const [shelfWithExtra, setShelfWithExtra] = useState(item);
  const [zones, setZones] = useState(zonesList);
  const [aisles, setAisles] = useState(aislesList);
  const [racks, setRacks] = useState(racksList);
  const [zone, setZone] = useState(zones.find(
    (zone) => zone.id === shelfWithExtra.shelf.zone
  ) as Zone);
  const [aisle, setAisle] = useState(aisles.find(
    (aisle) => aisle.id === shelfWithExtra.shelf.aisle
  ) as Aisle);
  const [rack, setRack] = useState(racks.find(
    (rack) => rack.id === shelfWithExtra.shelf.rack
  ) as Rack);
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
    synchronizeList({
      streamer: streamer as Worker,
      list: racks,
      setList: setRacks,
      type: "Rack",
    });

    syncShelfWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: shelfWithExtra,
      setElement: setShelfWithExtra,
    });
  }, []);

  useEffect(() => {
    setZone(zones.find(
      (zone) => zone.id === shelfWithExtra.shelf.zone
    ) as Zone);
    setAisle(aisles.find(
      (aisle) => aisle.id === shelfWithExtra.shelf.aisle
    ) as Aisle);
    setRack(racks.find(
      (rack) => rack.id === shelfWithExtra.shelf.rack
    ) as Rack);
  }, [shelfWithExtra])

  return (
    <header className="p-4 border-b">
      <h1 className="font-semibold text-2xl xl:text-2xl tracking-tight">
        {shelfWithExtra.shelf.name}
      </h1>
      <span className="font-light">{shelfWithExtra.shelf.id}</span>
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
              {shelfWithExtra.itemsCount}
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

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.rack}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              <LabelRack 
                rack={rack}
                setRack={setRack}
              />
            </div>
          </div>
        </div>

      </div>
      <FetchToastPattern 
        type="Shelf"
        dict={dictToast}
        id={shelfWithExtra.shelf.id as string}
      />
    </header>
  )
}
