import { ZonesWithExtra, ZoneWithExtra } from "@/app/lib/types/data/zones";
import ZoneWithExtraCard from "./ZoneWithExtraCard";

interface ListZonesWithExtraProps {
  zonesWithExtra: ZoneWithExtra[];
}

export default function ListZonesWithExtra({
  zonesWithExtra,
}: ListZonesWithExtraProps) {
  return (
    <div className="grid grid-cols-5">
      { zonesWithExtra.map((zone: ZoneWithExtra) => (
        <ZoneWithExtraCard 
          item={zone}
        />
      ))} 
    </div>
  )
}
