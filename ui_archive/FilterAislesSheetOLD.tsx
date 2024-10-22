//"use client"
//
//import { useEffect, useState, ChangeEvent, useRef, useCallback, memo, RefObject } from "react";
//import { usePathname, useSearchParams } from "next/navigation";
//import { SearchParams } from "@/app/lib/types/pageParams";
//import { deepMerge, decodeSearchParams, encodeSearchParams } from "@/app/lib/searchParams";
//import { Zone, Zones } from "@/app/lib/types/data/zones";
//import { DictSelectField } from "@/app/lib/types/dictionary/form";
//
//import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
//import { SheetHeader, SheetTitle, SheetTrigger } from "@/app/ui/components/sheet";
//import ForeignKeyFilter from "../ForeignKeyFilter";
//import { Button } from "@/app/ui/components/button";
//import Link from "next/link";
//import { ListFilter } from "lucide-react";
//import SearchFilterPattern from "../SearchFilterPattern";
//import { Input } from "@/app/ui/components/input";
//
//interface Props {
//  zones: {
//    list: Zones;
//    dict: DictSelectField;
//  }
//}
//
//export default function FilterAislesSheet({
//  zones,
//}: Props) {
//  const ref = useRef(null) as RefObject<HTMLInputElement>
//  const pathname = usePathname();
//  const searchParams = useSearchParams();
//  const params = new URLSearchParams(searchParams);
//  const currentParams = decodeSearchParams(params.get("q"));
//
//  const [search, setSearch] = useState("sus");
//
//  const handleInput = (value: ChangeEvent<HTMLInputElement>) => {
//    setSearch(value.target.value);
//  }
//
//  const [link, setLink] = useState("");
//  const [updatedParams, setUpdatedParams] = useState(currentParams);
//
//  const [zone, setZone] = useState(
//    updatedParams.aisles?.filters?.zone
//    ? zones.list.find(
//      (item) => item.id == updatedParams.aisles?.filters?.zone) 
//        || {id: "", name: ""} as Zone
//    : {id: "", name: ""} as Zone
//  );
//
//  //useEffect(() => {
//  //  let diff: SearchParams = {};
//  //  diff["aisles"] = { ...{ filters: { zone: zone.id }}};
//  //  const newParams = deepMerge({...currentParams}, diff);
//  //  setUpdatedParams(newParams);
//  //}, [zone]);
//
//  //useEffect(() => {
//  //  console.log("updated: ", search)
//  //  let diff: SearchParams = {};
//  //  diff["aisles"] = { ...{ filters: { search: search }}};
//  //  const newParams = deepMerge({...currentParams}, diff);
//  //  setUpdatedParams(newParams);
//  //}, [search]);
//
//  //useEffect(() => {
//  //  const newParamsString = encodeSearchParams(updatedParams);
//  //  params.set("q", newParamsString);
//  //  setLink(`${pathname}?${params.toString()}`);
//  //}, [updatedParams])
//
//  const SheetPatternTrigger = useCallback(() => {
//    return (
//      <>
//        <SheetTrigger asChild className="w-full">
//          <Button variant="secondary">
//            <ListFilter className="w-4 h-4 mr-2" />
//            Filters
//          </Button>
//        </SheetTrigger>
//      </>
//    );
//  }, []);
//
//  const SheetPatternBody = useCallback(() => {
//    return (
//      <div>
//        <SheetHeader className="mb-4">
//         <SheetTitle className="font-semibold text-xl">
//            Filter
//          </SheetTitle>
//        </SheetHeader>
//
//        <div className="mb-4">
//          <ForeignKeyFilter<"Zone"> 
//            name="Zone"
//            list={zones.list}
//            dict={zones.dict}
//            element={zone}
//            setElement={setZone}
//          />
//
//          <Input 
//            type="text"
//            placeholder="Your search.."
//            onChange={handleInput}
//            value={search}
//            ref={ref}
//          />
//
//        </div>
//
//        <div className="flex gap-2">
//          <Button asChild> 
//            <Link href={link}>Filtra</Link>
//          </Button>
//          <Button variant="secondary" onClick={() => {
//            setZone({id: "", name: ""});
//            //setSearch("");
//          }}> 
//            Reset
//          </Button>
//        </div>
//      </div>
//    );
//  }, [zone, search]);
//
//  return (
//    <>
//      <SheetWrapper
//        Trigger={SheetPatternTrigger}
//        Body={SheetPatternBody}
//      />
//    </>
//  )
//}
//
// FilterAislesSheet.tsx
"use client";

import React, { useEffect, useState, useRef, useCallback, RefObject } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchParams } from "@/app/lib/types/pageParams";
import { deepMerge, decodeSearchParams, encodeSearchParams } from "@/app/lib/searchParams";
import { Zone, Zones } from "@/app/lib/types/data/zones";
import { DictSelectField } from "@/app/lib/types/dictionary/form";

import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
import { SheetTrigger } from "@/app/ui/components/sheet";
import { Button } from "@/app/ui/components/button";
import { ListFilter } from "lucide-react";
import SheetPatternBody from "./SheetPatternBody"; // Adjust the import path accordingly

interface Props {
  zones: {
    list: Zones;
    dict: DictSelectField;
  };
}

export default function FilterAislesSheet({ zones }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentParams = decodeSearchParams(params.get("q"));

  const [link, setLink] = useState("");
  const [updatedParams, setUpdatedParams] = useState(currentParams);

  const [zone, setZone] = useState<Zone>(
    updatedParams.aisles?.filters?.zone
      ? zones.list.find((item) => item.id === updatedParams.aisles?.filters?.zone) || { id: "", name: "" }
      : { id: "", name: "" }
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff["aisles"] = { filters: { zone: zone.id } };
    const newParams = deepMerge({ ...currentParams }, diff);
    setUpdatedParams(newParams);
  }, [zone]);

  useEffect(() => {
    const newParamsString = encodeSearchParams(updatedParams);
    params.set("q", newParamsString);
    setLink(`${pathname}?${params.toString()}`);
  }, [updatedParams, pathname, params]);

  const MemoizedSheetPatternBody = useCallback(() => (
    <SheetPatternBody zones={zones} zone={zone} setZone={setZone} link={link} />
  ), [zones, zone, setZone, link]);

  const SheetPatternTrigger = useCallback(() => {
    return (
      <SheetTrigger asChild className="w-full">
        <Button variant="secondary">
          <ListFilter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
    );
  }, []);

  return (
    <SheetWrapper
      Trigger={SheetPatternTrigger}
      Body={MemoizedSheetPatternBody}
    />
  );
}
