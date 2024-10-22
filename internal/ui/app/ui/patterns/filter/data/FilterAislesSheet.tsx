"use client"

import { useEffect, useState, ChangeEvent, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchParams } from "@/app/lib/types/pageParams";
import { deepMerge, decodeSearchParams, encodeSearchParams } from "@/app/lib/searchParams";
import { Zone, Zones } from "@/app/lib/types/data/zones";
import { DictSelectField } from "@/app/lib/types/dictionary/form";

import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
import { SheetHeader, SheetTitle, SheetTrigger } from "@/app/ui/components/sheet";
import ForeignKeyFilter from "../ForeignKeyFilter";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import { ListFilter } from "lucide-react";
import SearchFilterPattern from "../SearchFilterPattern";
import { Input } from "@/app/ui/components/input";

interface Props {
  zones: {
    list: Zones;
    dict: DictSelectField;
  }
}

export default function FilterAislesSheet({
  zones,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

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
  const [search, setSearch] = useState("");

  useEffect(() => {
    let diff: SearchParams = {};
    diff["aisles"] = { ...{ filters: { zone: zone.id }}};
    const newParams = deepMerge({...currentParams}, diff);
    setUpdatedParams(newParams);
  }, [zone]);

  useEffect(() => {
    console.log("updated: ", search)
    let diff: SearchParams = {};
    diff["aisles"] = { ...{ filters: { search: search }}};
    const newParams = deepMerge({...currentParams}, diff);
    setUpdatedParams(newParams);
  }, [search]);

  useEffect(() => {
    const newParamsString = encodeSearchParams(updatedParams);
    params.set("q", newParamsString);
    setLink(`${pathname}?${params.toString()}`);
  }, [updatedParams])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const SheetPatternTrigger = () => {
    return (
      <>
        <SheetTrigger asChild className="w-full">
          <Button variant="secondary">
            <ListFilter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
      </>
    );
  };

  const SheetPatternBody = () => {
    return (
      <div>
        <SheetHeader className="mb-4">
          <SheetTitle className="font-semibold text-xl">
            Filter
          </SheetTitle>
        </SheetHeader>

        <div className="mb-4">
          <ForeignKeyFilter<"Zone"> 
            name="Zone"
            list={zones.list}
            dict={zones.dict}
            element={zone}
            setElement={setZone}
          />
          <Input
            type="text"
            placeholder="Your search.."
            onBlur={handleChange}
            //value={search}
            ref={inputRef}
          />
          <SearchFilterPattern 
            search={search}
            setSearch={setSearch}
          />

        </div>

        <div className="flex gap-2">
          <Button asChild> 
            <Link href={link}>Filtra</Link>
          </Button>
          <Button variant="secondary" onClick={() => {
            setZone({id: "", name: ""});
            setSearch("");
          }}> 
            Reset
          </Button>
        </div>
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
