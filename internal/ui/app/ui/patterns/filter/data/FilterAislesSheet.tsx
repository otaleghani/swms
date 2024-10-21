"use client"

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchParams } from "@/app/lib/types/pageParams";
import { deepMerge, decodeSearchParams, encodeSearchParams } from "@/app/lib/searchParams";
import { Zone, Zones } from "@/app/lib/types/data/zones";
import { DictSelectField } from "@/app/lib/types/dictionary/form";

import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
import { SheetHeader, SheetTitle, SheetTrigger } from "@/app/ui/components/sheet";
import ForeignKeyFilter from "../ForeignKeyFilter";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";

interface Props {
  zones: {
    list: Zones;
    dict: DictSelectField;
  }
}

export default function FilterAislesSheet({
  zones,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentParams = decodeSearchParams(params.get("q"));

  const [link, setLink] = useState("");
  const [updatedParams, setUpdatedParams] = useState(currentParams);

  const [zone, setZone] = useState(
    updatedParams.aisles?.filters?.zone
    ? zones.list.find(
      (item) => item.id == updatedParams.aisles?.filters?.zone) 
        || {id: "", name: ""} as Zone
    : {id: "", name: ""} as Zone
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff["aisles"] = { ...{ filters: { zone: zone.id }}};
    if (zone.id == "") {
      delete diff["aisles"].filters?.zone
    }
    const newParams = deepMerge({...currentParams}, diff);
    setUpdatedParams(newParams);
  }, [zone]);


  useEffect(() => {
    const newParamsString = encodeSearchParams(updatedParams);
    params.set("q", newParamsString);
    setLink(`${pathname}?${params.toString()}`);
  }, [updatedParams])

  const SheetPatternTrigger = () => {
    return (
      <>
        <SheetTrigger asChild className="w-full">
          <Button>Sus</Button>
        </SheetTrigger>
      </>
    );
  };

  const SheetPatternBody = () => {
    return (
      <div>
        <SheetHeader>
          <SheetTitle className="font-semibold text-xl">
            Filter
          </SheetTitle>
        </SheetHeader>
        <ForeignKeyFilter<"Zone"> 
          name="Zone"
          list={zones.list}
          dict={zones.dict}
          element={zone}
          setElement={setZone}
        />
        <Button asChild> 
          <Link href={link}>Filtra</Link>
        </Button>
      </div>
    );
  };

  return (
    <>
      <SheetWrapper
        Trigger={SheetPatternTrigger}
        Body={SheetPatternBody}
      />
    </>
  )
}
