"use client"


import { useEffect, useState } from "react";
import streamer from "@/app/lib/workers";

import { ZonesWithExtra, ZoneWithExtra } from "@/app/lib/types/data/zones";
import ZoneWithExtraCard from "./ZoneWithExtraCard";
import { synchronizeZoneWithExtraList } from "@/app/lib/synchronizers/data/zonesWithExtra";

interface ListZonesWithExtraProps {
  zonesWithExtra: ZoneWithExtra[];
}

export default function ListZonesWithExtra({
  zonesWithExtra,
}: ListZonesWithExtraProps) {
  const [zones, setZones] = useState(zonesWithExtra)

  useEffect(() => {
    synchronizeZoneWithExtraList(
      streamer as Worker,
      zones,
      setZones,
    )
  }, [])

  return (
    <div className="grid grid-cols-5">
      { zones.map((zone: ZoneWithExtra) => (
        <ZoneWithExtraCard 
          item={zone}
        />
      ))} 
    </div>
  )
}
