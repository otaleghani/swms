"use client";

import { Zones } from "@/app/lib/types/data/zones";
import { 
  DictInputField, 
  DictSelectField 
} from "@/app/lib/types/dictionary/form";
import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
import { 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle 
} from "@/app/ui/components/sheet";
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/input";
import { ListFilter } from "lucide-react";
import Link from "next/link";
import ForeignKeyFilter from "../ForeignKeyFilter";
import { Label } from "@/app/ui/components/label";

// Filters
import { useFilterParams } from "../hooks/useFilter";
import { useFilterZones } from "../hooks/useFilterZones";
import { useFilterSearch } from "../hooks/useFilterSearch";

interface Props {
  zones: {
    list: Zones;
    dict: DictSelectField;
  },
  search: {
    dict: DictInputField;
  }
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
  )
}

const SheetPatternBody = ({zones, search}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { zone, setZone } = 
    useFilterZones(params, zones.list, "aisles", setParams);

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "aisles", setParams);

  return (
    <>
      <SheetHeader className="mb-4">
       <SheetTitle className="font-semibold text-xl">
          Filter
        </SheetTitle>
      </SheetHeader>
      <div className="mb-4 grid gap-2">
        <div>
          <Label>{zones.dict.select.label}</Label>
          <ForeignKeyFilter<"Zone"> 
            name="Zone"
            list={zones.list}
            dict={zones.dict}
            element={zone}
            setElement={setZone}
          />
        </div> 
        <div>
          <Label>{search.dict.label}</Label>
          <Input 
            type="text"
            placeholder="Your search.."
            onChange={handleInput}
            value={searchTerm}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button asChild> 
          <Link href={link}>Filtra</Link>
        </Button>
        <Button variant="secondary" onClick={() => {
          setZone({id: "", name: ""});
          setSearchTerm("");
        }}> 
          Reset
        </Button>
      </div>
    </>
  )
}

export default function FilterAisles({
  zones,
  search
}: Props) {

  const BodyBody = () => {
    return (<SheetPatternBody zones={zones} search={search}/>)
  }
  return (
    <>
      <SheetWrapper
        Trigger={SheetPatternTrigger}
        Body={BodyBody}
      />
    </>
  )
}
