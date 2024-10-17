"use client"

import { useEffect, useState } from "react";
import streamer from "@/app/lib/workers";

import { ZoneWithExtra } from "@/app/lib/types/data/zones";
import ZoneWithExtraCard from "./ZoneWithExtraCard";
import { synchronizeZoneWithExtraList } from "@/app/lib/synchronizers/data/zonesWithExtra";

import { useToast } from "@/app/ui/components/hooks/use-toast";
import { ToastAction } from "@/app/ui/components/toast";
import { DictFetchingToasts } from "@/app/lib/types/dictionary/toasts";
import { ToastType } from "@/app/lib/synchronizers/utils";

interface ListZonesWithExtraProps {
  zonesWithExtra: ZoneWithExtra[];
  dictFetchingToast: DictFetchingToasts
}

export default function ListZonesWithExtra({
  zonesWithExtra,
}: ListZonesWithExtraProps) {
  const { toast } = useToast()
  const [ showToast, setShowToast ] = useState("none" as ToastType);

  useEffect(() => {
    synchronizeZoneWithExtraList({
      streamer: streamer as Worker,
      zonesWithExtra: zonesWithExtra,
      setShowToast: setShowToast,
    });
    return () => {
      streamer?.terminate();
    };
  }, []);

  useEffect(() => {
    if (showToast) {
      toast({ 
        title: "Your view is out-of-data",
        description: "Refresh your page to see the newly added data.",
        //variant: "destructive",
        action: <ToastAction 
        altText="Refresh"
          onClick={() => {
            //router.refresh()
            window.location.href = window.location.href;
          }}>
            Refresh
          </ToastAction>,
      })
      //setShowToast(false)
    }
  }, [showToast]);

  return (
    <div className="grid xl:grid-cols-5 p-4 gap-4">
      { zonesWithExtra.map((zone: ZoneWithExtra) => (
        <ZoneWithExtraCard 
          item={zone}
        />
      ))} 
    </div>
  )
}
