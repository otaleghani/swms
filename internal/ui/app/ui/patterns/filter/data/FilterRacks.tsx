"use client";

// Types and interfaces
import { Zones } from "@/app/lib/types/data/zones";
import { Aisles, Aisle } from "@/app/lib/types/data/aisles";

// Dictionaries
import { DictInputField, DictSelectField } from "@/app/lib/types/dictionary/form";
import { DictFilters } from "@/app/lib/types/dictionary/misc";

// Components
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";
import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
import { FilterSheetTrigger, FilterSheetHeader } from "../FilterSheetTrigger";
import ForeignKeyFilter from "../ForeignKeyFilter";

// Next components
import Link from "next/link";

// Filters
import { useFilterParams } from "../hooks/useFilter";
import { useFilterSearch } from "../hooks/useFilterSearch";
import { useFilterZones } from "../hooks/useFilterZones";
import { useFilterAisles } from "../hooks/useFilterAisles";

interface Props {
  fields: {
    zones: {
      list: Zones;
      dict: DictSelectField;
    };
    aisles: {
      list: Aisles;
      dict: DictSelectField;
    };
    search: {
      dict: DictInputField;
    };
  };
  dict: DictFilters;
};

const SheetPatternBody = ({fields, dict}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { zone, setZone } = 
    useFilterZones(params, fields.zones.list, "racks", setParams);

  const { aisle, setAisle } = 
    useFilterAisles(params, fields.aisles.list, "racks", setParams);

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "racks", setParams);

  return (
    <>
      <FilterSheetHeader dict={dict} />
      <div className="mb-4 grid gap-2">
        <div>
          <Label>{fields.zones.dict.select.label}</Label>
          <ForeignKeyFilter<"Zone"> 
            name="Zone"
            list={fields.zones.list}
            dict={fields.zones.dict}
            element={zone}
            setElement={setZone}
          />
        </div> 
        <div>
          <Label>{fields.aisles.dict.select.label}</Label>
          <ForeignKeyFilter<"Aisle"> 
            name="Aisle"
            list={fields.aisles.list}
            dict={fields.aisles.dict}
            element={aisle}
            setElement={setAisle}
          />
        </div> 
        <div>
          <Label>{fields.search.dict.label}</Label>
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
          <Link href={link}>{dict.button}</Link>
        </Button>
        <Button variant="secondary" onClick={() => {
          setAisle({id: "", name: ""} as Aisle);
          setZone({id: "", name: ""});
          setSearchTerm("");
        }}> 
          Reset
        </Button>
      </div>
    </>
  )
}

export default function FilterRacks({
  fields,
  dict,
}: Props) {
  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} />)
  }
  const SheetBody = () => {
    return (<SheetPatternBody fields={fields} dict={dict}/>)
  }
  return (
    <>
      <SheetWrapper
        Trigger={SheetHead}
        Body={SheetBody}
      />
    </>
  )
}
