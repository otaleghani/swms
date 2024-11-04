import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Zone } from "@/app/lib/types/data/zones"
import streamer from "@/app/lib/workers";
import { useState, useEffect, Dispatch, SetStateAction} from "react";
import Link from "next/link";

interface Props {
  zone: Zone;
  setZone: Dispatch<SetStateAction<Zone>>;
}

/** Creates a span */
export default function ZoneNameWidget({
  zone,
  setZone,
}: Props) {
  //const [zone, setZone] = useState(zoneInitialValue);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: zone,
      setElement: setZone,
      type: "Zone",
    })
  }, [])

  return (
    <Link
      href={`/zones/${zone?.id}`}
      className={
        syncState === "remove" ? "animate-delete" :
        syncState === "update" ? "animate-update" :
        ""
      }
    >{zone?.name}</Link>
  )
}
